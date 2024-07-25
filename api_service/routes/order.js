const express = require("express");
const { sequelize, Order} = require("../models");
const {authAdminToken, authUserToken} = require('../auth/auth');
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

module.exports = route;

route.get("/" , authAdminToken, async (req, res) => {
    try{
        const orders = await Order.findAll();
        return res.json(orders);

    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.get("/:id", authAdminToken, async (req, res) => {
    try{
        const order = await Order.findByPk(req.params.id);
        return res.json(order);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});


route.post("/" , authUserToken, async (req, res) => {
    try{
        const newOrderData = {
            ...req.body,
            ordered_time: new Date(),
        };
        const newOrder = await Order.create(newOrderData);
        return res.json(newOrder);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});


route.put("/:id", authAdminToken, async (req, res) => {
    try{
        const order = await Order.findByPk(req.params.id);
        order.status = req.body.status;
        order.save();

        return res.json(order);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});


route.delete("/:id", authAdminToken,async (req, res) => {
    try{
        const order = await Order.findByPk(req.params.id);
        order.destroy();
        return res.json({ message: "Successfully deleted" });
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});



