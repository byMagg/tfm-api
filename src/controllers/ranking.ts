import { Ranking } from '../models/Ranking'
import { sendResponse } from '../utils'

export const getRankings = async (req: any, res: any) => {
  const { page = '1', limit = '10' } = req.query

  const pageNumber = Number(page) || 1
  const limitNumber = Number(limit) || 10
  const skip = (pageNumber - 1) * limitNumber

  const rankings = await Ranking.find().skip(skip).limit(limitNumber)

  const totalRankings = await Ranking.countDocuments()

  sendResponse({
    res,
    data: rankings,
    totalPages: Math.ceil(totalRankings / limitNumber),
    total: totalRankings,
    page: pageNumber,
  })
}

export const getRanking = async (req: any, res: any) => {
  const ranking = await Ranking.findById(req.params.id)
  sendResponse({
    res,
    data: ranking,
  })
}
