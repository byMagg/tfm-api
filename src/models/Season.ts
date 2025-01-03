import mongoose, { Schema } from 'mongoose'

const leagueMatchSchema = new Schema(
  {
    player1: {
      type: String,
    },
    player2: {
      type: String,
    },
    season_id: {
      type: String,
    },
    winner: {
      type: String,
    },
    score: {
      type: String,
    },
  },
  {
    collection: 'league-matches',
  }
)

export const seasonSchema = new Schema(
  {
    startedAt: {
      type: Date,
    },
    league_id: {
      type: String,
    },
    matches: [leagueMatchSchema],
  },
  {
    collection: 'seasons',
  }
)

export const Season = mongoose.model('Season', seasonSchema)
