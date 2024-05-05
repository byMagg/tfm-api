import { Match } from './models/Match'

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
  },
}
