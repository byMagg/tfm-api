import { League } from './models/League'
import { LeagueMatch } from './models/LeagueMatch'
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
    checkPlayerInLeague: async (_: any, { playerId }: { playerId: string }) => {
      return await League.findOne({ players: playerId })
    },
    startSeason: async (_: any, { leagueId }: { leagueId: string }) => {
      return await League.findOneAndUpdate(
        { _id: leagueId },
        { $set: { startedAt: new Date() } },
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
    getLeagueMatchesInSeason: async (
      _: any,
      { leagueId }: { leagueId: string }
    ) => {
      return await LeagueMatch.find({ league_id: leagueId })
    },
    getLeagueMatchesInSeasonByPlayer: async (
      _: any,
      { leagueId, playerId }: { leagueId: string; playerId: string }
    ) => {
      return await LeagueMatch.find({
        league_id: leagueId,
        $or: [{ player1: playerId }, { player2: playerId }],
      })
    },
    createLeagueMatchesInSeason: async (
      _: any,
      { leagueId }: { leagueId: string }
    ) => {
      const league = await League.findOne({ _id: leagueId })
      if (!league) {
        throw new Error('League not found')
      }

      const { players } = league
      const matches = []
      for (let i = 0; i < players.length; i++) {
        for (let j = i + 1; j < players.length; j++) {
          matches.push({
            player1: players[i],
            player2: players[j],
            league_id: leagueId,
          })
        }
      }

      return await LeagueMatch.insertMany(matches)
    },
    setMatchScore: async (
      _: any,
      {
        matchId,
        score,
        winner,
      }: { matchId: string; score: string; winner: string }
    ) => {
      return await LeagueMatch.findOneAndUpdate(
        { _id: matchId },
        { $set: { score, winner } },
        { new: true }
      )
    },
  },
}
