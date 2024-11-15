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

    leaguesCount: async () => {
      return await League.estimatedDocumentCount()
    },
    getLeagues: async (
      _: any,
      { limit = 10, offset = 0 }: { limit: number; offset: number }
    ) => {
      return await League.find().limit(limit).skip(offset)
    },
    getLeagueById: async (_: any, { leagueId }: { leagueId: string }) => {
      return await League.findOne({
        _id: leagueId,
      })
    },
    createLeague: async (_: any, { name }: { name: string }) => {
      if (!name) {
        throw new Error('Name is required')
      }

      return await League.create({ name })
    },
    addPlayersToLeague: async (
      _: any,
      { leagueId, playerIds }: { leagueId: string; playerIds: string[] }
    ) => {
      return await League.findOneAndUpdate(
        { _id: leagueId },
        { $addToSet: { players: { $each: playerIds } } },
        { new: true }
      )
    },
    deletePlayersFromLeague: async (
      _: any,
      { leagueId, playerIds }: { leagueId: string; playerIds: string[] }
    ) => {
      return await League.findOneAndUpdate(
        { _id: leagueId },
        { $pull: { players: { $in: playerIds } } },
        { new: true }
      )
    },
  },
}
