import * as dotenv from 'dotenv'
import express from 'express'
import { connect } from './db'
import router from './routes'

dotenv.config()

const app = express()
const port = Number(process.env.PORT) || 3000

app.use(express.json())

app.use('/api', router)

connect()

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
