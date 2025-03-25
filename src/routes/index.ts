import { Router } from 'express'
import { League } from '../models/League'

const router = Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.get('/leagues', async (req, res) => {
  const leagues = await League.find()
  res.json(leagues)
})

router.get('/leagues/:id', async (req, res) => {
  const league = await League.findById(req.params.id)
  res.json(league)
})

router.post('/leagues', async (req, res) => {
  const league = new League(req.body)
  await league.save()
  res.json(league)
})

export default router
