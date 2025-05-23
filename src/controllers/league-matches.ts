import { LeagueMatch } from '../models/LeagueMatch'
import { Standing } from '../models/Standing'
import { sendError, sendResponse } from '../utils'

export const getLeagueMatch = async (req: any, res: any) => {
  const match = await LeagueMatch.findById(req.params.id)
    .populate('player1 player2', 'name')
    .populate('round', 'startDate endDate league_id')

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

  if (!match) {
    return sendError({
      res,
      statusCode: 404,
      message: 'Match not found',
    })
  }

  if (!match.player1 || !match.player2) {
    return sendError({
      res,
      statusCode: 400,
      message: 'Players not found',
    })
  }

  if (!match.round) {
    return sendError({
      res,
      statusCode: 400,
      message: 'Round not found',
    })
  }

  const loser = match.player1 === winner ? match.player2 : match.player1

  await Standing.findOneAndUpdate(
    { player: winner, round: match.round },
    { $inc: { points: 5 } },
    { new: true, upsert: true }
  )

  await Standing.findOneAndUpdate(
    { player: loser, round: match.round },
    { $inc: { points: 3 } },
    { new: true, upsert: true }
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
