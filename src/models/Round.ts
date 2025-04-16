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
    groups: [
      {
        players: [
          {
            type: String,
            ref: 'User',
          },
        ],
        _id: false,
      },
    ],
  },
  {
    collection: 'rounds',
  }
)

export const Round = mongoose.model('Round', roundSchema)
