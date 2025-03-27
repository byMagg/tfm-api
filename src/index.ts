import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { connect } from './db'
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

io.on('connection', (socket) => {
  console.log('user connected', socket.id)

  socket.on('message', (msg) => {
    io.emit('message', msg)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id)
  })
})

httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
