import bcrypt from 'bcryptjs'
import mongoose, { Schema } from 'mongoose'

interface IUser extends Document {
  _id: string
  name: string
  email: string
  matchPassword(enteredPassword: string): Promise<boolean>
}

const userSchema = new Schema<IUser>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  {
    collection: 'users',
  }
)

userSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model<IUser>('User', userSchema)
