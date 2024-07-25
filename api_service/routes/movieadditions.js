const express = require("express");
const { sequelize, MovieAddition } = require("../models");
const route = express.Router();
const { authAdminToken, authUserToken } = require('../auth/auth');

route.use(express.json());
route.use(express.urlencoded({extended:true}));

route.get("/", authUserToken, async (req, res) => {
    try {
        const movieAdditions = await MovieAddition.findAll();
        return res.json(movieAdditions);
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.get("/:id", authUserToken, async (req, res) => {
    try {
        const movieAddition = await MovieAddition.findByPk(req.params.id);
        return res.json(movieAddition);
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.post("/", authAdminToken, async (req, res) => {
    try {
        const newMovieAddition = await MovieAddition.create(req.body);
        return res.json(newMovieAddition);
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.put("/:id", authAdminToken, async (req, res) => {
    try {
        const movieAddition = await MovieAddition.findByPk(req.params.id);
        movieAddition.movie_id = req.body.movie_id;
        movieAddition.addition_id = req.body.addition_id;
        await movieAddition.save();
        return res.json(movieAddition);
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.delete("/", authAdminToken, async (req, res) => {
    try {
        const { movie_id, addition_id } = req.body;

        const movieAddition = await MovieAddition.findOne({
            where: {
                movie_id: movie_id,
                addition_id: addition_id
            }
        });
        if (!movieAddition) {
            console.log(`Movie addition not found for movie ID ${movie_id} and addition ID ${addition_id}`);
            return res.status(404).json({ error: "Movie addition not found" });
        }

        await movieAddition.destroy();
        console.log(`Movie addition for movie ID ${movie_id} and addition ID ${addition_id} deleted successfully`);
        return res.json(movieAddition);
    } catch (err) {
        console.log(`Error deleting movie addition for movie ID ${movie_id} and addition ID ${addition_id}:`, err);
        res.status(500).json({ error: "Error deleting movie addition", data: err });
    }
});


module.exports = route;