require('dotenv').config();
const express = require('express');
const { sequelize, User } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

let corsOptions = {
    origin: ['http://localhost:9000', 'http://127.0.0.1:9000', 'http://localhost:8080', 'http://127.0.0.1:8080'],
    optionsSuccessStatus: 200,
    credentials: true
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(cors(corsOptions));

app.post('/register', (req, res) => {
    const obj = {
        username: req.body.username,
        email: req.body.email,
        admin: false,
        password: bcrypt.hashSync(req.body.password, 10)
    };
    User.create(obj).then( rows => {
        const usr = {
            userId: rows.id,
            user: rows.username
        };
        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
        res.json({ token: token });
    }).catch( err => res.status(500).json(err) );
});


app.post('/login', (req, res) => {
    User.findOne({ where: { username: req.body.username } })
        .then(usr => {
            if (!usr) {
                return res.status(400).json({ msg: "User does not exist" });
            }
            if (!req.body.password) {
                return res.status(400).json({ msg: "Password is required" });
            }
            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    user: usr.username,
                    admin: usr.admin
                };
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ msg: "Server error" });
        });
});




app.listen({ port: 8001 }, async () => {
    await sequelize.authenticate();
});