import { Router } from 'express'
import { login, register } from '../controllers/auth'
import {
  addPlayersToLeague,
  checkPlayerInLeague,
  createLeague,
  getHistoricMatches,
  getLeague,
  getLeagues,
  getRound,
  initRound,
  removePlayersFromLeague,
  startSeason,
} from '../controllers/league'
import {
  getLeagueMatch,
  setLeagueMatchDate,
  setLeagueMatchScore,
} from '../controllers/league-matches'
import { getMatch, getMatches } from '../controllers/match'
import { getPlayer, getPlayers } from '../controllers/player'
import { getRanking, getRankings } from '../controllers/ranking'
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
router.get('/leagues/:id/rounds', protect, getRound)
router.post('/leagues', protect, createLeague)

router.post('/leagues/:id/start', protect, startSeason)
router.get('/leagues/:id/matches', protect, getHistoricMatches)
router.post('/leagues/:id/matches', protect, initRound)
router.post('/leagues/:id/players', protect, addPlayersToLeague)
router.delete('/leagues/:id/players', protect, removePlayersFromLeague)

router.get('/leagues/players/:playerId', protect, checkPlayerInLeague)

// league-matches
router.get('/league-matches/:id', protect, getLeagueMatch)
router.post('/league-matches/:id/score', protect, setLeagueMatchScore)
router.post('/league-matches/:id/date', protect, setLeagueMatchDate)

// matches
router.get('/matches', protect, getMatches)
router.get('/matches/:id', protect, getMatch)

// players
router.get('/players', protect, getPlayers)
router.get('/players/:id', protect, getPlayer)

// rankings
router.get('/rankings', protect, getRankings)
router.get('/rankings/:id', protect, getRanking)

// auth
router.post('/auth/register', register)
router.post('/auth/login', login)

export default router
