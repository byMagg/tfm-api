import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { User } from './models/User'

dotenv.config()

const seedUsers = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/tfm'
    )
    console.log('Connected to MongoDB')

    await User.deleteMany({})
    console.log('Users deleted')

    const hashedUsers = usersToCreate.map((user) => {
      const hashedPassword = bcrypt.hashSync(user.password, 10)
      return {
        ...user,
        password: hashedPassword,
      }
    })

    await User.insertMany(hashedUsers)
    console.log('Users created')

    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB: ', error)
  }
}

const usersToCreate = [
  { email: 'pepe@gmail.com', password: 'password', name: 'Pepe' },
  { email: 'pedro@gmail.com', password: 'password', name: 'Pedro' },
  { email: 'javier@gmail.com', password: 'password', name: 'Javier' },
  { email: 'silvia@gmail.com', password: 'password', name: 'Silvia' },
  { email: 'ana@gmail.com', password: 'password', name: 'Ana' },
  { email: 'carlos@gmail.com', password: 'password', name: 'Carlos' },
  { email: 'laura@gmail.com', password: 'password', name: 'Laura' },
  { email: 'maria@gmail.com', password: 'password', name: 'María' },
  { email: 'luis@gmail.com', password: 'password', name: 'Luis' },
  { email: 'sofia@gmail.com', password: 'password', name: 'Sofía' },
  { email: 'andres@gmail.com', password: 'password', name: 'Andrés' },
  { email: 'david@gmail.com', password: 'password', name: 'David' },
  { email: 'isabel@gmail.com', password: 'password', name: 'Isabel' },
  { email: 'mateo@gmail.com', password: 'password', name: 'Mateo' },
  { email: 'juan@gmail.com', password: 'password', name: 'Juan' },
  { email: 'claudia@gmail.com', password: 'password', name: 'Claudia' },
  { email: 'hector@gmail.com', password: 'password', name: 'Héctor' },
  {
    email: 'fernanda@gmail.com',
    password: 'password',
    name: 'Fernanda',
  },
  { email: 'roberto@gmail.com', password: 'password', name: 'Roberto' },
  { email: 'monica@gmail.com', password: 'password', name: 'Mónica' },
]

seedUsers()
