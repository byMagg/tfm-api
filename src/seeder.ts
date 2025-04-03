import dotenv from 'dotenv'
import admin from 'firebase-admin'
import mongoose from 'mongoose'
import { User } from './models/User'

dotenv.config()

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
})

const seedUsers = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/tfm'
    )
    console.log('Connected to MongoDB')

    await deleteAllUsers()
    console.log('Users deleted')

    await createUsers(usersToCreate)
    console.log('Users created')

    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB: ', error)
  }
}

async function deleteAllUsers() {
  try {
    let nextPageToken
    do {
      // Listar usuarios en lotes de hasta 1000 por página
      const listUsersResult = await admin.auth().listUsers(1000, nextPageToken)
      const userIds = listUsersResult.users.map((userRecord) => userRecord.uid)

      if (userIds.length > 0) {
        // Eliminar usuarios en lote
        await admin.auth().deleteUsers(userIds)
        console.log(`Eliminados ${userIds.length} usuarios`)
      }

      nextPageToken = listUsersResult.pageToken
    } while (nextPageToken)

    await User.deleteMany({})
    console.log('Todos los usuarios han sido eliminados.')
  } catch (error) {
    console.error('Error al eliminar usuarios:', error)
  }
}

async function createUsers(
  users: { email: string; password: string; name: string }[]
) {
  for (const user of users) {
    try {
      const userRecord = await admin.auth().createUser({
        email: user.email,
        password: user.password,
        displayName: user.name,
      })

      await User.create({
        _id: userRecord.uid,
        name: user.name,
        email: user.email,
      })

      console.log(`Usuario creado: ${userRecord.uid}`)
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error al crear usuario: ${error.message}`)
      }
    }
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
