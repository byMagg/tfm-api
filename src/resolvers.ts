import { Match } from './models/Match'
import { Player } from './models/Player'

export const resolvers = {
  Query: {
    matchesCount: async () => {
      return await Match.estimatedDocumentCount()
    },
    getMatches: async (
      _: any,
      { limit = 10, offset = 0 }: { limit: number; offset: number }
    ) => {
      return await Match.find().limit(limit).skip(offset)
    },
    getMatchById: async (_: any, { matchId }: { matchId: string }) => {
      return await Match.findOne({ _id: matchId })
    },

    playersCount: async () => {
      return await Player.estimatedDocumentCount()
    },
    getPlayers: async (
      _: any,
      { limit = 10, offset = 0 }: { limit: number; offset: number }
    ) => {
      return await Player.find().limit(limit).skip(offset)
    },
    getPlayerById: async (_: any, { playerId }: { playerId: string }) => {
      return await Player.findOne({ _id: playerId })
    },
  },
}
