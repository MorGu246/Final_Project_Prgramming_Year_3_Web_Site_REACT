const express = require('express');
const router = express.Router();
const { pool } = require('../database');
// שליחת הודעה
router.post('/send', async (req, res) => {
    const { sender, receiver, content } = req.body;
    if (!content) return res.status(400).json({ message: "Content is empty" });

    try {
        const query = 'INSERT INTO messages (sender_name, receiver_name, message_content) VALUES (?, ?, ?)';
        await pool.promise().query(query, [sender, receiver, content]);
        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Error sending message:", err);
        res.status(500).json({ success: false });
    }
});

// משיכת היסטוריה
router.get('/history/:user1/:user2', async (req, res) => {
    const { user1, user2 } = req.params;
    try {
        const query = `
            SELECT sender_name, message_content, created_at 
            FROM messages 
            WHERE (sender_name = ? AND receiver_name = ?) 
               OR (sender_name = ? AND receiver_name = ?)
            ORDER BY created_at ASC`;
        const [rows] = await pool.promise().query(query, [user1, user2, user2, user1]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json([]);
    }
});

module.exports = router;