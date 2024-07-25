const express = require('express');
const cors = require("cors");
const { sequelize, Movie, Category, MovieAddition, Addition, OrderItem, Order } = require("./models");
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = require('./auth/auth');

app.use(cors({
    origin: ['http://localhost:9000', 'http://127.0.0.1:9000', 'http://localhost:8080', 'http://127.0.0.1:8080'],
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('Hello from REST API service');
});

const movieRoutes = require("./routes/movie.js");
app.use("/movie", movieRoutes);
const categoryRoutes = require("./routes/category.js");
app.use("/category", categoryRoutes);
const additionRoutes = require("./routes/addition.js");
app.use("/addition", additionRoutes);
const orderRoutes = require("./routes/order.js");
app.use("/order", orderRoutes);
const orderitemRoutes = require("./routes/orderitem.js");
app.use("/orderitem", orderitemRoutes);
const movieadditionRoutes = require("./routes/movieadditions.js");
app.use("/movieadditions", movieadditionRoutes);

app.listen({ port:8000 }, async () => {
    console.log("Started server on localhost:8000");
    await sequelize.sync({force:false});
    console.log("DB synced");
});

