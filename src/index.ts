import cookieParser from 'cookie-parser'
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
const port = Number(process.env.PORT) || 3000

export const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:4321',
    credentials: true,
  },
})

app.use(cookieParser())
app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:4321',
    credentials: true,
  })
)

connect()

import './socket'

app.use('/api', router)

httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
