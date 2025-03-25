import { Router } from 'express'
import { League } from '../models/League'
import { LeagueMatch } from '../models/LeagueMatch'
import { Season } from '../models/Season'
import { sendError, sendResponse } from '../utils'

const router = Router()

router.get('/leagues', async (req, res) => {
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
})

router.get('/leagues/:id', async (req, res) => {
  const league = await League.findById(req.params.id)
  sendResponse({
    res,
    data: league,
  })
})

router.post('/leagues', async (req, res) => {
  const league = new League(req.body)
  await league.save()
  sendResponse({
    res,
    statusCode: 201,
    data: league,
  })
})

router.post('/leagues/:id/players', async (req, res) => {
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
})

router.get('/leagues/players/:playerId', async (req, res) => {
  const { playerId } = req.params
  const league = await League.findOne({ players: playerId })

  if (!league) {
    return sendError({
      res,
      statusCode: 404,
      message: 'Player not found in any league',
    })
  }

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  const currentSeason = await Season.findOne({
    league_id: league._id,
    startedAt: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
  })

  const matches = await LeagueMatch.find({
    season_id: currentSeason?._id,
    player1: playerId,
  })

  sendResponse({
    res,
    data: {
      league,
      currentSeason,
      matches,
    },
  })
})

router.get('/league-matches/:id', async (req, res) => {
  const match = await LeagueMatch.findById(req.params.id)
  sendResponse({
    res,
    data: match,
  })
})

export default router
