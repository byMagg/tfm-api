import { LeagueMatch } from '../models/LeagueMatch'
import { sendResponse } from '../utils'

export const getLeagueMatch = async (req: any, res: any) => {
  const match = await LeagueMatch.findById(req.params.id)
    .populate('player1 player2', 'name')
    .populate('round', 'startDate endDate')

  sendResponse({
    res,
    data: match,
  })
}

export const setLeagueMatchScore = async (req: any, res: any) => {
  const { id } = req.params
  const { score, winner } = req.body

  const match = await LeagueMatch.findByIdAndUpdate(
    { _id: id },
    { $set: { score, winner } },
    { new: true }
  )

  sendResponse({
    res,
    data: match,
  })
}

export const setLeagueMatchDate = async (req: any, res: any) => {
  const { id } = req.params
  const { date } = req.body

  const match = await LeagueMatch.findByIdAndUpdate(
    { _id: id },
    { $set: { date } },
    { new: true }
  )

  sendResponse({
    res,
    data: match,
  })
}
