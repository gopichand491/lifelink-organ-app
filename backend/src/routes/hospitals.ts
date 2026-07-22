import { Router } from 'express';
import { db } from '../data/store';

const router = Router();

router.get('/', (_req, res) => res.json(db.hospitals));
router.get('/:id', (req, res) => {
  const h = db.hospitals.find((x) => x.id === req.params.id);
  if (!h) { res.status(404).json({ message: 'Not found' }); return; }
  res.json(h);
});

export default router;
