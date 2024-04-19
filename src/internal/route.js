import express from 'express';
import { getLeaderboardController } from './controller.js';

const route = express.Router();

route.get('/healthz', (req, res) => {
  res.send('OK');
})

route.get('/leaderboard/:type', (req, res) => {
  return getLeaderboardController(req, res);
})

export default route;