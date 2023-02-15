import { Router } from "express";
import CartManager from "../controllers/cartManager.js";

const cartRoutes = Router();
const cart = new CartManager("src/models/cart.json");

cartRoutes.get("/:cid", async (req,res) =>{
    const { cid } = req.params;
    const consult = await cart.getCart(parseInt(cid))
    res.send(consult)
})

cartRoutes.post("/", async (req,res) =>{
    const consult = await cart.createCart();
    res.send(consult)
})

cartRoutes.post("/:cid/product/:pid", async (req,res) =>{
    const { cid, pid } = req.params;
    const consult = await cart.addToCart(parseInt(cid),parseInt(pid));
    res.send(consult);
})

export default cartRoutes