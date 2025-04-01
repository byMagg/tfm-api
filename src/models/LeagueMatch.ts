import mongoose, { Schema } from 'mongoose'

const leagueMatchSchema = new Schema(
  {
    player1: {
      type: String,
      ref: 'User',
    },
    player2: {
      type: String,
      ref: 'User',
    },
    round_id: {
      type: String,
    },
    winner: {
      type: String,
      ref: 'User',
    },
    score: {
      type: String,
    },
  },
  {
    collection: 'league-matches',
  }
)

export const LeagueMatch = mongoose.model('LeagueMatch', leagueMatchSchema)
