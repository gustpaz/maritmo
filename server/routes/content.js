import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import db from '../database.js';

const router = express.Router();

// Public routes
router.get('/media', (req, res) => {
  const media = db.prepare('SELECT * FROM media ORDER BY created_at DESC').all();
  res.json(media);
});

router.get('/testimonials', (req, res) => {
  const testimonials = db.prepare('SELECT * FROM testimonials WHERE active = 1').all();
  res.json(testimonials);
});

// Protected routes
router.use(authenticateToken);

router.post('/media', (req, res) => {
  const { type, url, title } = req.body;
  const result = db.prepare(
    'INSERT INTO media (type, url, title) VALUES (?, ?, ?)'
  ).run(type, url, title);
  
  res.status(201).json({ id: result.lastInsertRowid });
});

router.delete('/media/:id', (req, res) => {
  db.prepare('DELETE FROM media WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

router.post('/testimonials', (req, res) => {
  const { author, content, rating, date } = req.body;
  const result = db.prepare(
    'INSERT INTO testimonials (author, content, rating, date) VALUES (?, ?, ?, ?)'
  ).run(author, content, rating, date);
  
  res.status(201).json({ id: result.lastInsertRowid });
});

router.put('/testimonials/:id', (req, res) => {
  const { author, content, rating, active } = req.body;
  db.prepare(`
    UPDATE testimonials
    SET author = ?, content = ?, rating = ?, active = ?
    WHERE id = ?
  `).run(author, content, rating, active, req.params.id);
  
  res.json({ success: true });
});

router.delete('/testimonials/:id', (req, res) => {
  db.prepare('UPDATE testimonials SET active = 0 WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

export default router;