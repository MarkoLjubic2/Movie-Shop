require('dotenv').config({ path: '../auth_service/.env' });
const express = require('express');
const Joi = require('joi');
const path = require('path');
const fs = require('fs');
const BP = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
app.use(BP.json());
app.use(BP.urlencoded({ extended: true }));
app.use(cookieParser());

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach(rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
}

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];

    if (token == null) {
        return res.status(401).json({ message: 'No token found' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log('Error verifying token:', err.message);
            return res.status(401).json({ message: 'Error verifying token' });
        }
        if (!user.admin) {
            console.log('User is not an admin');
            return res.status(403).json({ message: 'Access denied. You are not an admin.' });
        }
        req.user = user;
        next();
    });
}

app.use((req, res, next) => {
    if (!req.url.includes('/administrator')) {
        req.url = '/administrator' + req.url;
    }
    next();
});

app.get('/administrator/login', (req, res) => {
    res.sendFile('login.html', { root: './static/administrator' });
});

app.use('/administrator', (req, res, next) => {
    if (req.path.includes('/login')) {
        next();
    } else {
        authToken(req, res, next);
    }
});
app.use('/administrator', express.static(path.join(__dirname, 'static')));

app.get('/administrator/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/administrator/', `${req.params[0]}`));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.listen(9000, () => {
    console.log('Server started on localhost:9000');
});