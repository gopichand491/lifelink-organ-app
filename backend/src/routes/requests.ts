import { Router } from 'express';
import { db } from '../data/store';

const router = Router();

router.get('/', (_req, res) => res.json(db.requests));
router.get('/:id', (req, res) => {
  const r = db.requests.find((x) => x.id === req.params.id);
  if (!r) { res.status(404).json({ message: 'Not found' }); return; }
  res.json(r);
});
router.post('/', (req, res) => {
  const request = {
    id: `r${Date.now()}`,
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  db.requests.push(request);
  res.status(201).json(request);
});
router.patch('/:id', (req, res) => {
  const idx = db.requests.findIndex((r) => r.id === req.params.id);
  if (idx === -1) { res.status(404).json({ message: 'Not found' }); return; }
  db.requests[idx] = { ...db.requests[idx], ...req.body };
  res.json(db.requests[idx]);
});

export default router;
