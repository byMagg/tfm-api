import mongoose, { Schema } from 'mongoose'

const roundSchema = new Schema(
  {
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    league_id: {
      type: String,
    },
    round: {
      type: Number,
    },
  },
  {
    collection: 'rounds',
  }
)

export const Round = mongoose.model('Round', roundSchema)
