const jwt = require('jsonwebtoken');
require('dotenv').config();
function authAdminToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ msg: 'Unauthorized' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err || !user || user.user !== 'admin') {
            return res.status(403).json({ msg: 'Forbidden' });
        }

        req.user = user;
        next();
    });
}

function authUserToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ msg: 'Unauthorized' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err || !user) {
            return res.status(403).json({ msg: 'Forbidden' });
        }


        req.user = user;
        next();
    });
}

module.exports = {authAdminToken, authUserToken};