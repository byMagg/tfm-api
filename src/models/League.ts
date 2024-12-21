import mongoose, { Schema } from 'mongoose'
import { seasonSchema } from './Season'

const leagueSchema = new Schema(
  {
    name: {
      type: String,
    },
    players: {
      type: [String],
    },
    startedAt: {
      type: Date,
    },
    seasons: [seasonSchema],
  },
  {
    collection: 'leagues',
  }
)

export const League = mongoose.model('League', leagueSchema)
