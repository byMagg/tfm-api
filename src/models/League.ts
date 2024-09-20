import mongoose, { Schema } from 'mongoose'

const leagueSchema = new Schema(
  {
    name: {
      type: 'String',
    },
    players: {
      type: 'Array',
    },
  },
  {
    collection: 'leagues',
  }
)

export const League = mongoose.model('League', leagueSchema)
