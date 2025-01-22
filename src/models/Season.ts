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
    collection: 'seasons',
  }
)

export const Season = mongoose.model('Season', seasonSchema)
