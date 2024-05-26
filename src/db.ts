import mongoose from 'mongoose'

export const connect = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/tfm'
    )
    console.log('Connected to MongoDB')
  } catch (error: any) {
    console.error('Error connecting to MongoDB: ', error.message)
  }
}
