const express = require("express");
const { sequelize, Addition} = require("../models");
const route = express.Router();
const {authAdminToken, authUserToken} = require('../auth/auth');
route.use(express.json());
route.use(express.urlencoded({extended:true}));

module.exports = route;

route.get("/",  authUserToken,async (req, res) => {
    try{
        const additions = await Addition.findAll();
        return res.json(additions);

    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.get("/:id", authUserToken, async (req, res) => {
    try{
        const addition = await Addition.findByPk(req.params.id);
        return res.json(addition);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});


route.post("/", authAdminToken, async (req, res) => {
    try{
        const newAddition = await Addition.create(req.body);
        return res.json(newAddition);

    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});


route.put("/:id", authAdminToken, async (req, res) => {
    try{
        const addition = await Addition.findByPk(req.params.id);
        addition.title = req.body.title;
        addition.save();
        return res.json(addition);

    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});


route.delete("/:id", authAdminToken,async (req, res) => {
    try{
        const addition = await Addition.findByPk(req.params.id);
        addition.destroy();
        return res.json(addition);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});



