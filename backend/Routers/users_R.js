const express = require('express');
const router = express.Router();
const { pool } = require('../database'); 
const { validateUser } = require('../Middleware/users_Mid');

// נתיב הרשמה: /auth/signup
router.post('/signup', validateUser, async (req, res) => {
    const { user_name, password } = req.body;
    try {
        const query = 'INSERT INTO users_db (user_name, password) VALUES (?, ?)';
        await pool.promise().query(query, [user_name, password]);
        res.status(200).json({ success: true, message: "User created!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Username already exists or DB error" });
    }
});

// נתיב התחברות: /auth/signin
router.post('/login', validateUser, async (req, res) => {
    const { user_name, password } = req.body;
    try {
        const query = 'SELECT * FROM users_db WHERE user_name = ? AND password = ?';
        const [rows] = await pool.promise().query(query, [user_name, password]);
        if (rows.length > 0) {
            res.status(200).json({ success: true });
        } else {
            res.status(401).json({ success: false, message: "Invalid username or password" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// חיפוש משתמש לפי שם (למשל עבור החיפוש)
router.get('/search/:name', async (req, res) => {
    const { name } = req.params;
    try {
        // מחפש משתמשים שהשם שלהם מכיל את מה שהוקלד (LIKE)
        const query = 'SELECT user_name FROM users_db WHERE user_name LIKE ? LIMIT 10';
        const [rows] = await pool.promise().query(query, [`%${name}%`]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ message: "Error searching users" });
    }
});

// שליפת רשימת אנשי קשר (כל מי שהתכתבנו איתו בעבר)
router.get('/contacts/:currentUser', async (req, res) => {
    const { currentUser } = req.params;
    try {
        const query = `
            SELECT 
                contact_name,
                message_content AS last_message,
                created_at,
                sender_name
            FROM (
                SELECT 
                    CASE WHEN sender_name = ? THEN receiver_name ELSE sender_name END AS contact_name,
                    message_content,
                    created_at,
                    sender_name,
                    ROW_NUMBER() OVER(PARTITION BY CASE WHEN sender_name = ? THEN receiver_name ELSE sender_name END ORDER BY created_at DESC) as rn
                FROM messages 
                WHERE sender_name = ? OR receiver_name = ?
            ) t
            WHERE rn = 1
            ORDER BY created_at DESC`;
        const [rows] = await pool.promise().query(query, [currentUser, currentUser, currentUser, currentUser]);
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching contacts" });
    }
});

module.exports = router;