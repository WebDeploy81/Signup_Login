const check_login = (req, res, next) => {
    const email = req.headers['email'];

    // Check if email is present in the header
    if (!email) {
        return res.status(400).json({ error: 'Email is required in the headers' });
    }

    // Attach the validated email to the request object
    req.email = email;
    next();
};

module.exports = check_login;