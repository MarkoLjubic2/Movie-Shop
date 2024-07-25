const express = require("express");
const { sequelize, OrderItem } = require("../models");
const {authAdminToken, authUserToken} = require('../auth/auth');
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

module.exports = route;

route.get("/", authUserToken, async (req, res) => {
    try{
        const orderId = req.query.order_id;
        let orderItems;
        if (orderId) {
            orderItems = await OrderItem.findAll({ where: { order_id: orderId } });
        } else {
            orderItems = await OrderItem.findAll();
        }
        return res.json(orderItems);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.get("/:id", authUserToken, async (req, res) => {
    try{
        const orderItem = await OrderItem.findByPk(req.params.id);
        return res.json(orderItem);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.post("/", authUserToken,async (req, res) => {
    try{
        const newItem = await OrderItem.create(req.body);
        return res.json(newItem);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.put("/:id", authAdminToken,async (req, res) => {
    try{
        const orderItem = await OrderItem.findByPk(req.params.id);
        if(orderItem){
            Object.assign(orderItem, req.body);
            await orderItem.save();
            return res.json(orderItem);
        } else {
            return res.status(404).json({ error: "Order item not found" });
        }
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.delete("/:id", authAdminToken, async (req, res) => {
    try{
        const orderItem = await OrderItem.findByPk(req.params.id);
        await orderItem.destroy();
        return res.json({ message: "Successfully Deleted" });
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});