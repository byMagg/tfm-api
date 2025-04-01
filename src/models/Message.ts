import mongoose, { Schema } from 'mongoose'

const messageSchema = new Schema(
  {
    content: {
      type: String,
    },
    from: {
      type: String,
      ref: 'User',
    },
    to: {
      type: String,
      ref: 'User',
    },
  },
  {
    collection: 'messages',
    timestamps: true,
  }
)

export const Message = mongoose.model('Message', messageSchema)
