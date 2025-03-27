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
const io = new Server(httpServer, {})
const port = Number(process.env.PORT) || 3000

app.use(express.json())

app.use(cors())

connect()

app.use('/api', router)

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
