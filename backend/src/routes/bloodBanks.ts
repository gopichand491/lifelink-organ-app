import { Router } from 'express';
import { db } from '../data/store';

const router = Router();

router.get('/', (_req, res) => res.json(db.bloodBanks));
router.get('/:id', (req, res) => {
  const b = db.bloodBanks.find((x) => x.id === req.params.id);
  if (!b) { res.status(404).json({ message: 'Not found' }); return; }
  res.json(b);
});

export default router;
