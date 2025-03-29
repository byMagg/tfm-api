import mongoose, { Schema } from 'mongoose'

const messageSchema = new Schema(
  {
    content: {
      type: String,
    },
    from: {
      type: String,
    },
    to: {
      type: String,
    },
  },
  {
    collection: 'messages',
    timestamps: true,
  }
)

export const Message = mongoose.model('Message', messageSchema)
