import { Router } from 'express';
import { db } from '../data/store';

const router = Router();

router.get('/', (_req, res) => res.json(db.campaigns));
router.get('/:id', (req, res) => {
  const c = db.campaigns.find((x) => x.id === req.params.id);
  if (!c) { res.status(404).json({ message: 'Not found' }); return; }
  res.json(c);
});

export default router;
