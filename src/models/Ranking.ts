import mongoose, { Schema } from 'mongoose'

const rankingSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    ranking_date: {
      type: 'Number',
    },
    rank: {
      type: 'Number',
    },
    player: {
      type: 'Number',
    },
    points: {
      type: 'Number',
    },
  },
  {
    collection: 'rankings',
  }
)

export const Ranking = mongoose.model('Ranking', rankingSchema)
