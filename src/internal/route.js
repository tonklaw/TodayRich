import express from 'express';
import { getLeaderboardController } from './controllers/leaderboardController.js';
import { getMe, login, logout, register } from './controllers/authController.js';
import { protectedRoute } from './middlewares/auth.js';

const route = express.Router();

route.get('/health', (req, res) => {
  res.status(200).send('OK');
})

route.get('/leaderboard/:type', getLeaderboardController)

route.post('/login', login)
route.post('/register', register)
route.get('/me', protectedRoute, getMe)
route.get('/logout', protectedRoute, logout)


export default route;