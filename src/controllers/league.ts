import { Types } from 'mongoose'
import { League } from '../models/League'
import { LeagueMatch } from '../models/LeagueMatch'
import { Round } from '../models/Round'
import { Standing } from '../models/Standing'
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
  const { id } = req.params

  if (!id || !Types.ObjectId.isValid(id)) {
    return sendError({
      res,
      statusCode: 400,
      message: 'Debes enviar un id',
    })
  }

  const league = await League.findById(id)
  sendResponse({
    res,
    data: league,
  })
}

export const getRound = async (req: any, res: any) => {
  const { id } = req.params

  const round = await Round.findOne({
    league_id: id,
    startDate: { $lte: new Date() },
    endDate: { $gte: new Date() },
  }).populate('groups.players')

  const standings = await Standing.find({ round: round?._id })
    .sort({ points: -1 })
    .populate('player')

  sendResponse({
    res,
    data: {
      ...round?.toJSON(),
      standings,
    },
  })
}

export const getHistoricMatches = async (req: any, res: any) => {
  const { id } = req.params

  const round = await Round.find({
    league_id: id,
    groups: { $exists: true, $not: { $size: 0 } },
  })
    .select('_id')
    .sort({ round: 1 })

  if (!round) {
    return sendError({
      res,
      statusCode: 404,
      message: 'Round not found',
    })
  }

  const matches = await LeagueMatch.find({
    round: { $in: round.map((r) => r._id) },
    winner: { $exists: true },
  }).populate('player1 player2')

  sendResponse({
    res,
    data: matches,
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

  const startDate = new Date()
  const endDate = new Date()

  if (startDate.getMonth() === 11) {
    startDate.setMonth(0)
    startDate.setFullYear(startDate.getFullYear() + 1)
  }

  if (endDate.getMonth() === 11) {
    endDate.setMonth(0)
    endDate.setFullYear(endDate.getFullYear() + 1)
  }

  let currentRound = 1

  for (let i = startDate.getMonth(); i < 12; i++) {
    startDate.setMonth(i)
    startDate.setDate(1)
    startDate.setHours(2, 0, 0, 0)

    endDate.setMonth(i)
    endDate.setDate(28)
    endDate.setHours(23, 59, 59, 999)

    await Round.create({
      startDate: startDate,
      endDate: endDate,
      league_id: league._id,
      round: currentRound++,
    })
  }

  sendResponse({
    res,
    statusCode: 201,
    data: league,
  })
}

export const startSeason = async (req: any, res: any) => {
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

function chunkPlayers<T>(
  players: T[],
  numberOfGroups: number
): { players: T[] }[] {
  const groups: { players: T[] }[] = Array.from(
    { length: numberOfGroups },
    () => ({ players: [] })
  )
  let i = 0

  for (const player of players) {
    groups[i % numberOfGroups].players.push(player)
    i++
  }

  return groups
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

  const groupCount = Math.ceil(league.players.length / 6)
  const groups = chunkPlayers(league.players, groupCount)

  const currentRound = await Round.findOneAndUpdate(
    {
      league_id: league._id,
      startDate: {
        $lte: now,
      },
      endDate: {
        $gte: now,
      },
    },
    {
      $set: {
        groups,
      },
    }
  )

  if (!currentRound) {
    return sendError({
      res,
      statusCode: 404,
      message: 'Round not found',
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

  await LeagueMatch.deleteMany({ round: currentRound._id })
  await Standing.deleteMany({ round: currentRound._id })

  const matches = []

  for (let group of groups) {
    for (let i = 0; i < group.players.length; i++) {
      for (let j = i + 1; j < group.players.length; j++) {
        matches.push({
          round: currentRound._id,
          player1: group.players[i],
          player2: group.players[j],
        })
      }
    }
  }

  const response = await LeagueMatch.insertMany(matches)

  sendResponse({
    res,
    data: response,
  })
}

export const initEveryRound = async (req: any, res: any) => {
  const leagues = await League.find()
  const now = new Date()

  for (const league of leagues) {
    const groupCount = Math.ceil(league.players.length / 6)
    const groups = chunkPlayers(league.players, groupCount)

    const currentRound = await Round.findOneAndUpdate(
      {
        league_id: league._id,
        startDate: {
          $lte: now,
        },
        endDate: {
          $gte: now,
        },
      },
      {
        $set: {
          groups,
        },
      }
    )

    if (!currentRound) continue

    const players = league.players

    if (players.length < 2) continue

    await LeagueMatch.deleteMany({ round: currentRound._id })
    await Standing.deleteMany({ round: currentRound._id })

    const matches = []

    for (let group of groups) {
      for (let i = 0; i < group.players.length; i++) {
        for (let j = i + 1; j < group.players.length; j++) {
          matches.push({
            round: currentRound._id,
            player1: group.players[i],
            player2: group.players[j],
          })
        }
      }
    }

    await LeagueMatch.insertMany(matches)
  }

  sendResponse({
    res,
    data: leagues.map((league) => {
      return {
        id: league._id,
        name: league.name,
        players: league.players.length,
      }
    }),
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
    const currentRound = await Round.findOne({
      league_id: league._id,
      startDate: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    })

    const matches = await LeagueMatch.find({
      round: currentRound?._id,
      $or: [{ player1: playerId }, { player2: playerId }],
    }).populate('player1 player2', 'name')

    mergedLeagues.push({
      ...league.toObject(),
      currentRound,
      matches,
    })
  }

  sendResponse({
    res,
    data: mergedLeagues,
  })
}
