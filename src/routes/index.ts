import { Router } from 'express'
import { League } from '../models/League'
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

export default router
