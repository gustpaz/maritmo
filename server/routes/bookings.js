import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import db from '../database.js';

const router = express.Router();

// Public routes
router.post('/', (req, res) => {
  const {
    packageId,
    customerName,
    customerEmail,
    customerWhatsapp,
    date,
    time,
    passengers,
    addons
  } = req.body;

  const result = db.prepare(`
    INSERT INTO bookings (
      package_id, customer_name, customer_email, customer_whatsapp,
      date, time, passengers
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    packageId, customerName, customerEmail, customerWhatsapp,
    date, time, passengers
  );

  const bookingId = result.lastInsertRowid;

  // Add addons if any
  if (addons && addons.length > 0) {
    const stmt = db.prepare('INSERT INTO booking_addons (booking_id, addon_id) VALUES (?, ?)');
    addons.forEach(addonId => stmt.run(bookingId, addonId));
  }

  res.status(201).json({ id: bookingId });
});

// Protected routes
router.use(authenticateToken);

router.get('/', (req, res) => {
  const bookings = db.prepare(`
    SELECT b.*, p.name as package_name
    FROM bookings b
    JOIN packages p ON b.package_id = p.id
    ORDER BY b.date DESC, b.time DESC
  `).all();
  
  res.json(bookings);
});

router.put('/:id/status', (req, res) => {
  const { status } = req.body;
  db.prepare('UPDATE bookings SET status = ? WHERE id = ?').run(status, req.params.id);
  res.json({ success: true });
});

export default router;