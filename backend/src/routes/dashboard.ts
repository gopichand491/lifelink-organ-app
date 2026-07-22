import { Router } from 'express';
import { db } from '../data/store';

const router = Router();

router.get('/stats', (_req, res) => res.json(db.stats));
router.get('/overview', (_req, res) => {
  res.json({
    stats: db.stats,
    recentRequests: db.requests.slice(0, 5),
    recentDonors: db.donors.slice(0, 5),
    activeCampaigns: db.campaigns.filter((c) => c.status === 'active'),
    notifications: db.notifications,
  });
});

export default router;
