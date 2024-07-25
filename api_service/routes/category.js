const express = require("express");
const route = express.Router();
const {authAdminToken, authUserToken} = require('../auth/auth');
const { sequelize, Category, Movie} = require("../models");

route.use(express.json());
route.use(express.urlencoded({extended:true}));

module.exports = route;

route.get("/", authUserToken, async (req, res) => {
    try{
        const categories = await Category.findAll();
        return res.json(categories);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.get("/:id", authUserToken,async (req, res) => {
    try{
        const category = await Category.findByPk(req.params.id);
        return res.json(category);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});


route.post("/", authAdminToken, async (req, res) => {
    try{
        const newCategory = await Category.create(req.body);
        return res.json(newCategory);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});


route.put("/:id", authAdminToken,async (req, res) => {
    try{
        const category = await Category.findByPk(req.params.id);
        category.title = req.body.title;
        category.save();
        return res.json(category);

    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});


route.delete("/:id", authAdminToken, async (req, res) => {
    try{
        const category = await Category.findByPk(req.params.id);
        category.destroy();
        return res.json(category);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});



