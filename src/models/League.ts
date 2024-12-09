import mongoose, { Schema } from 'mongoose'

const leagueSchema = new Schema(
  {
    name: {
      type: 'String',
    },
    players: {
      type: [String],
    },
    startedAt: {
      type: Date,
    },
  },
  {
    collection: 'leagues',
  }
)

export const League = mongoose.model('League', leagueSchema)
