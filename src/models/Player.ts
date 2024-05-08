import mongoose, { Schema } from 'mongoose'

const playerSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    player_id: {
      type: 'Number',
    },
    name_first: {
      type: 'String',
    },
    name_last: {
      type: 'String',
    },
    hand: {
      type: 'String',
    },
    dob: {
      type: 'Number',
    },
    ioc: {
      type: 'String',
    },
    height: {
      type: 'Number',
    },
    wikidata_id: {
      type: 'String',
    },
  },
  {
    collection: 'players',
  }
)

export const Player = mongoose.model('Player', playerSchema)
