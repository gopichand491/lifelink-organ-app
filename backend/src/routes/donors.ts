import { Router } from 'express';
import { db } from '../data/store';

const router = Router();

router.get('/', (_req, res) => res.json(db.donors));
router.get('/:id', (req, res) => {
  const donor = db.donors.find((d) => d.id === req.params.id);
  if (!donor) { res.status(404).json({ message: 'Not found' }); return; }
  res.json(donor);
});
router.post('/', (req, res) => {
  const donor = { id: `d${Date.now()}`, ...req.body, rating: 5.0, isAvailable: true };
  db.donors.push(donor);
  res.status(201).json(donor);
});
router.patch('/:id', (req, res) => {
  const idx = db.donors.findIndex((d) => d.id === req.params.id);
  if (idx === -1) { res.status(404).json({ message: 'Not found' }); return; }
  db.donors[idx] = { ...db.donors[idx], ...req.body };
  res.json(db.donors[idx]);
});

export default router;
