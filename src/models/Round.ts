import mongoose, { Schema } from 'mongoose'

const seasonSchema = new Schema(
  {
    startedAt: {
      type: Date,
    },
    league_id: {
      type: String,
    },
  },
  {
    collection: 'rounds',
  }
)

export const Round = mongoose.model('Round', seasonSchema)
