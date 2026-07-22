import { Router } from 'express';
import { db } from '../data/store';

const router = Router();

router.get('/', (_req, res) => res.json(db.articles));
router.get('/:id', (req, res) => {
  const a = db.articles.find((x) => x.id === req.params.id);
  if (!a) { res.status(404).json({ message: 'Not found' }); return; }
  res.json(a);
});

export default router;
