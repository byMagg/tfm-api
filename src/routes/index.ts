import { Router } from 'express'
import { login, register } from '../controllers/auth'
import {
  addPlayersToLeague,
  checkPlayerInLeague,
  createLeague,
  getLeague,
  getLeagues,
  initRound,
  removePlayersFromLeague,
  startLeague,
} from '../controllers/league'
import {
  getLeagueMatch,
  setLeagueMatchScore,
} from '../controllers/league-matches'
import { createUser, getUsers, getUsersByIds } from '../controllers/user'
import { protect } from '../middlewares/auth'

const router = Router()

// users
router.get('/users', protect, getUsers)
router.post('/users/get-by-ids', protect, getUsersByIds)
router.post('/users', protect, createUser)

// leagues
router.get('/leagues', protect, getLeagues)
router.get('/leagues/:id', protect, getLeague)
router.post('/leagues', protect, createLeague)

router.post('/leagues/:id/start', protect, startLeague)
router.post('/leagues/:id/matches', protect, initRound)
router.post('/leagues/:id/players', protect, addPlayersToLeague)
router.delete('/leagues/:id/players', protect, removePlayersFromLeague)

router.get('/leagues/players/:playerId', protect, checkPlayerInLeague)

// league-matches
router.get('/league-matches/:id', protect, getLeagueMatch)
router.post('/league-matches/:id/score', protect, setLeagueMatchScore)

// auth
router.post('/register', register)
router.post('/login', login)

export default router
