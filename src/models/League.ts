import mongoose, { Schema } from 'mongoose'

const leagueSchema = new Schema(
  {
    name: {
      type: 'String',
    },
    players: {
      type: [String],
    },
  },
  {
    collection: 'leagues',
  }
)

export const League = mongoose.model('League', leagueSchema)
