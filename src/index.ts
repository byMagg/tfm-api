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
const io = new Server(httpServer)

const port = Number(process.env.PORT) || 3000

app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:4321',
    credentials: true,
  })
)

connect()

app.use('/api', router)

io.on('connection', async (socket) => {
  socket.on('join', async (userId) => {
    socket.join(userId)
    console.log(`Usuario ${userId} se unió a su sala privada`)
    try {
      const messages = await Message.find({
        $or: [{ from: userId }, { to: userId }],
      }).sort({ timestamp: 1 })
      socket.emit('previousMessages', messages)
    } catch (error) {}
  })

  socket.on('message', async ({ content, from, to }) => {
    try {
      const newMessage = new Message({
        content,
        from,
        to,
      })
      await newMessage.save()

      io.to(to).to(from).emit('message', newMessage)
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
