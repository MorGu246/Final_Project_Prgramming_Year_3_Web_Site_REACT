const validateUser = (req, res, next) => {
    const { user_name, password } = req.body;

    if (!user_name || !password) {
        return res.status(400).json({ message: "Please provide both username and password" });
    }

    // אם הכל תקין, ממשיכים לראוטר
    next();
};

module.exports = { validateUser };