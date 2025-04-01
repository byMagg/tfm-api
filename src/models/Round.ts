import mongoose, { Schema } from 'mongoose'

const roundSchema = new Schema(
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

export const Round = mongoose.model('Round', roundSchema)
