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
    round: {
      type: String,
      ref: 'Round',
    },
    winner: {
      type: String,
      ref: 'User',
    },
    score: {
      type: String,
    },
    date: {
      type: Date,
    },
    submitDate: {
      type: Date,
    },
  },
  {
    collection: 'league-matches',
  }
)

export const LeagueMatch = mongoose.model('LeagueMatch', leagueMatchSchema)
