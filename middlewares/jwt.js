const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: "no token" });
    }

    try {
        const decoded = jwt.verify(token, '!launch@pad@23&/109%bits*hyderabad&!2023@#$');
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "invalid token" });
    }
}

module.exports = verifyToken;