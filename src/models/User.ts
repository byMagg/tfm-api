import bcrypt from 'bcryptjs'
import mongoose, { Schema } from 'mongoose'

interface IUser extends Document {
  name: string
  email: string
  password: string
  matchPassword(enteredPassword: string): Promise<boolean>
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    collection: 'users',
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model<IUser>('User', userSchema)
