import { League } from './models/League'
import { LeagueMatch } from './models/LeagueMatch'
import { Match } from './models/Match'
import { Player } from './models/Player'
import { Ranking } from './models/Ranking'
import { Season } from './models/Season'

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

      const league = await League.create({ name })

      const startedAt = new Date()

      if (startedAt.getMonth() === 11) {
        startedAt.setMonth(0)
        startedAt.setFullYear(startedAt.getFullYear() + 1)
      }

      for (let i = startedAt.getMonth(); i < 12; i++) {
        startedAt.setMonth(i)
        startedAt.setDate(1)
        startedAt.setHours(0, 0, 0, 0)

        await Season.create({
          startedAt: startedAt,
          league_id: league._id,
        })
      }

      return league
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
    initializeLeagueMatchesInSeason: async (
      _: any,
      { leagueId }: { leagueId: string }
    ) => {
      const league = await League.findOne({ _id: leagueId })

      if (!league) {
        throw new Error('League not found')
      }

      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

      const season = await Season.findOne({
        league_id: leagueId,
        startedAt: {
          $gte: startOfMonth,
          $lt: endOfMonth,
        },
      })

      if (!season) {
        throw new Error('Season not found')
      }

      const players = league.players

      if (players.length < 2) {
        throw new Error('Not enough players')
      }

      const matches = []

      for (let i = 0; i < players.length; i++) {
        for (let j = i + 1; j < players.length; j++) {
          matches.push({
            player1: players[i],
            player2: players[j],
            season_id: season._id,
          })
        }
      }

      return await LeagueMatch.insertMany(matches)
    },
    getLeagueMatchById: async (_: any, { matchId }: { matchId: string }) => {
      return await LeagueMatch.findOne({ _id: matchId })
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
  League: {
    seasons: async (parent: any) => {
      return await Season.find({ league_id: parent._id })
    },
    currentSeason: async (parent: any) => {
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

      return await Season.findOne({
        league_id: parent._id,
        startedAt: {
          $gte: startOfMonth,
          $lt: endOfMonth,
        },
      })
    },
  },
  Season: {
    matches: async (parent: any) => {
      return await LeagueMatch.find({ season_id: parent._id })
    },
  },
}
