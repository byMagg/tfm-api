import { Player } from '../models/Player'
import { sendResponse } from '../utils'

export const getPlayers = async (req: any, res: any) => {
  const { page = '1', limit = '10' } = req.query

  const pageNumber = Number(page) || 1
  const limitNumber = Number(limit) || 10
  const skip = (pageNumber - 1) * limitNumber

  const players = await Player.find().skip(skip).limit(limitNumber)

  const totalPlayers = await Player.countDocuments()

  sendResponse({
    res,
    data: players,
    totalPages: Math.ceil(totalPlayers / limitNumber),
    total: totalPlayers,
    page: pageNumber,
  })
}
