import mongoose, { Schema } from 'mongoose'

const standingSchema = new Schema(
  {
    player: {
      type: String,
      ref: 'User',
    },
    round: {
      type: String,
      ref: 'Round',
    },
    points: {
      type: Number,
    },
  },
  {
    collection: 'standings',
  }
)

export const Standing = mongoose.model('Standing', standingSchema)
