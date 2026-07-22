import { Router } from 'express';
import { db } from '../data/store';

const router = Router();

router.get('/', (_req, res) => res.json(db.notifications));
router.patch('/:id/read', (req, res) => {
  const n = db.notifications.find((x) => x.id === req.params.id);
  if (!n) { res.status(404).json({ message: 'Not found' }); return; }
  n.read = true;
  res.json(n);
});

export default router;
