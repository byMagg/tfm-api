import { League } from '../models/League'
import { LeagueMatch } from '../models/LeagueMatch'
import { Round } from '../models/Round'
import { sendError, sendResponse } from '../utils'

export const getLeagues = async (req: any, res: any) => {
  const { page = '1', limit = '10' } = req.query

  const pageNumber = Number(page) || 1
  const limitNumber = Number(limit) || 10
  const skip = (pageNumber - 1) * limitNumber

  const leagues = await League.find().skip(skip).limit(limitNumber)
  const totalLeagues = await League.countDocuments()

  sendResponse({
    res,
    data: leagues,
    totalPages: Math.ceil(totalLeagues / limitNumber),
    total: totalLeagues,
    page: pageNumber,
  })
}

export const getLeague = async (req: any, res: any) => {
  const league = await League.findById(req.params.id)
  sendResponse({
    res,
    data: league,
  })
}

export const createLeague = async (req: any, res: any) => {
  const { name } = req.body

  if (!name) {
    return sendError({
      res,
      statusCode: 400,
      message: 'Debes enviar un nombre',
    })
  }

  const league = await League.create({ name })

  const startedAt = new Date()

  if (startedAt.getMonth() === 11) {
    startedAt.setMonth(0)
    startedAt.setFullYear(startedAt.getFullYear() + 1)
  }

  for (let i = startedAt.getMonth(); i < 12; i++) {
    startedAt.setMonth(i)
    startedAt.setDate(1)
    startedAt.setHours(0, 0, 0, 0)

    await Round.create({
      startedAt: startedAt,
      league_id: league._id,
    })
  }

  sendResponse({
    res,
    statusCode: 201,
    data: league,
  })
}

export const startLeague = async (req: any, res: any) => {
  const { id } = req.params
  const league = await League.findOneAndUpdate(
    { _id: id },
    { startedAt: new Date() },
    { new: true }
  )

  if (!league) {
    return sendError({
      res,
      statusCode: 404,
      message: 'League not found',
    })
  }

  sendResponse({
    res,
    data: league,
  })
}

export const initRound = async (req: any, res: any) => {
  const { id } = req.params
  const league = await League.findById(id)

  if (!league) {
    return sendError({
      res,
      statusCode: 404,
      message: 'League not found',
    })
  }

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  const currentSeason = await Round.findOne({
    league_id: league._id,
    startedAt: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
  })

  if (!currentSeason) {
    return sendError({
      res,
      statusCode: 404,
      message: 'Season not found',
    })
  }

  const players = league.players

  if (players.length < 2) {
    return sendError({
      res,
      statusCode: 400,
      message: 'Not enough players',
    })
  }

  const matches = []

  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      matches.push({
        season_id: currentSeason._id,
        player1: players[i],
        player2: players[j],
      })
    }
  }

  const response = await LeagueMatch.insertMany(matches)

  sendResponse({
    res,
    data: response,
  })
}

export const addPlayersToLeague = async (req: any, res: any) => {
  const { id } = req.params
  const { playerIds } = req.body

  if (!Array.isArray(playerIds) || playerIds.length === 0) {
    return sendError({
      res,
      statusCode: 400,
      message: 'Debes enviar una lista de playerIds válida',
    })
  }

  const league = await League.findById(id)
  if (!league) {
    return sendError({
      res,
      statusCode: 404,
      message: 'League not found',
    })
  }

  league.players = [...new Set([...league.players, ...playerIds])]

  await league.save()

  sendResponse({
    res,
    data: league,
  })
}

export const removePlayersFromLeague = async (req: any, res: any) => {
  const { id } = req.params

  const { playerIds } = req.body

  const league = await League.findById(id)

  if (!league) {
    return sendError({
      res,
      statusCode: 404,
      message: 'League not found',
    })
  }

  if (!Array.isArray(playerIds) || playerIds.length === 0) {
    return sendError({
      res,
      statusCode: 400,
      message: 'Debes enviar una lista de playerIds válida',
    })
  }

  league.players = league.players.filter(
    (playerId) => !playerIds.includes(playerId)
  )

  await league.save()

  sendResponse({
    res,
    data: league,
  })
}

export const checkPlayerInLeague = async (req: any, res: any) => {
  const { playerId } = req.params
  const leagues = await League.find({ players: playerId })

  if (!leagues) {
    return sendError({
      res,
      statusCode: 404,
      message: 'Player not found in any league',
    })
  }

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  let mergedLeagues = []

  for (const league of leagues) {
    const currentSeason = await Round.findOne({
      league_id: league._id,
      startedAt: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    })

    const matches = await LeagueMatch.find({
      season_id: currentSeason?._id,
      $or: [{ player1: playerId }, { player2: playerId }],
    }).populate('player1 player2', 'name')

    mergedLeagues.push({
      ...league.toObject(),
      currentSeason,
      matches,
    })
  }

  sendResponse({
    res,
    data: {
      leagues: mergedLeagues,
    },
  })
}
