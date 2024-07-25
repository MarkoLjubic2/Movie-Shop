const express = require("express");
const { sequelize, Movie, Category, MovieAddition, Addition } = require("../models");
const {authAdminToken, authUserToken} = require('../auth/auth');
const Joi = require('joi');
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

module.exports = route;

const movieSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    category_id: Joi.number().required().min(1)
});

route.get("/", authUserToken, async (req, res) => {
    try{
        const movies = await Movie.findAll({
            include: [{
                model: Category,
                as: 'categories'
            }]
        });
        return res.json(movies);

    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.get("/:id", authUserToken, async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id, {
            include: [
                {
                    model: Category,
                    as: 'categories'
                },
                {
                    model: MovieAddition,
                    as: 'movieAdditions',
                    include: [
                        {
                            model: Addition,
                            as: 'additions'
                        }
                    ]
                }
            ]
        });
        return res.json(movie);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});


route.post("/", authAdminToken, async (req, res) => {
    try{
        const { error } = movieSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const newMovie = await Movie.create(req.body);
        return res.json(newMovie);

    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});


route.put("/:id", authAdminToken, async (req, res) => {
    try{
        const movie = await Movie.findByPk(req.params.id);
        movie.title = req.body.title || movie.title;
        movie.description = req.body.description || movie.description;
        movie.price = req.body.price || movie.price;
        movie.category_id = req.body.category_id || movie.category_id;
        await movie.save();
        return res.json(movie);

    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.delete("/:id", authAdminToken, async (req, res) => {
    try{
        const movie = await Movie.findByPk(req.params.id);
        await movie.destroy();
        return res.json( movie.id );

    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});



