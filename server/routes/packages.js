import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import db from '../database.js';

const router = express.Router();

// Public routes
router.get('/', (req, res) => {
  const packages = db.prepare('SELECT * FROM packages WHERE active = 1').all();
  res.json(packages);
});

// Protected routes
router.use(authenticateToken);

router.post('/', (req, res) => {
  const { name, description, duration, price, maxPassengers } = req.body;
  const result = db.prepare(`
    INSERT INTO packages (name, description, duration, price, max_passengers)
    VALUES (?, ?, ?, ?, ?)
  `).run(name, description, duration, price, maxPassengers);
  
  res.status(201).json({ id: result.lastInsertRowid });
});

router.put('/:id', (req, res) => {
  const { name, description, duration, price, maxPassengers, active } = req.body;
  db.prepare(`
    UPDATE packages
    SET name = ?, description = ?, duration = ?, price = ?, max_passengers = ?, active = ?
    WHERE id = ?
  `).run(name, description, duration, price, maxPassengers, active, req.params.id);
  
  res.json({ success: true });
});

router.delete('/:id', (req, res) => {
  db.prepare('UPDATE packages SET active = 0 WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

export default router;