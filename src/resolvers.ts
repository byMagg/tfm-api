import { League } from './models/League'
import { Match } from './models/Match'
import { Player } from './models/Player'
import { Ranking } from './models/Ranking'

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
    getPlayerByPlayerId: async (_: any, { playerId }: { playerId: string }) => {
      return await Player.findOne({ player_id: playerId })
    },

    rankingsCount: async () => {
      return await Ranking.estimatedDocumentCount()
    },
    getRankings: async (
      _: any,
      { limit = 10, offset = 0 }: { limit: number; offset: number }
    ) => {
      return await Ranking.find().limit(limit).skip(offset)
    },
    getRankingById: async (_: any, { rankingId }: { rankingId: string }) => {
      return await Ranking.findOne({ _id: rankingId })
    },
    createLeague: async (_: any, { name }: { name: string }) => {
      return await League.create({ name })
    },
  },
}
