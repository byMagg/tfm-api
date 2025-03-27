import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { connect } from './db'
import { Message } from './models/Message'
import router from './routes'

dotenv.config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:4321',
  },
})

const port = Number(process.env.PORT) || 3000

app.use(express.json())
app.use(cors())

connect()

app.use('/api', router)

io.on('connection', async (socket) => {
  console.log('user connected', socket.id)

  const messages = await Message.find().sort({ timestamp: 1 })
  socket.emit('previousMessages', messages)

  socket.on('message', async (msg) => {
    try {
      const newMessage = new Message(msg)
      await newMessage.save()

      io.emit('message', msg)
    } catch (error) {
      console.log(error)
    }
  })

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id)
  })
})

httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
