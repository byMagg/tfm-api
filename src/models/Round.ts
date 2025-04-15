import mongoose, { Schema } from 'mongoose'

interface IRound extends Document {
  startDate: Date
  endDate: Date
  league_id: string
  round: number
  standings: {
    [playerId: string]: number
  }
}

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
    standings: {
      type: Map,
      of: Number,
      default: {},
      ref: 'User',
    },
  },
  {
    collection: 'rounds',
  }
)

export const Round = mongoose.model('Round', roundSchema)
