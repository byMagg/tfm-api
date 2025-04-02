import { Match } from '../models/Match'
import { sendResponse } from '../utils'

export const getMatches = async (req: any, res: any) => {
  const { page = '1', limit = '10' } = req.query

  const pageNumber = Number(page) || 1
  const limitNumber = Number(limit) || 10
  const skip = (pageNumber - 1) * limitNumber

  const matches = await Match.find().skip(skip).limit(limitNumber)

  const totalMatches = await Match.countDocuments()

  sendResponse({
    res,
    data: matches,
    totalPages: Math.ceil(totalMatches / limitNumber),
    total: totalMatches,
    page: pageNumber,
  })
}
