
export const getLeaderboardController = async (req, res) => {
  if (req.params.type === 'overall') {
    return res.json({ type: 'top' });
  } else if (req.params.type === 'single') {
    return 'Single game leaderboard';
  }
  return res.status(400).json({ error: 'Invalid leaderboard type' });
}
