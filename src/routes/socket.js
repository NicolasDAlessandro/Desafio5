import { Router } from "express";
import ProductManager  from "../controllers/productManager.js";

const socketRoutes = Router();
const prod = new ProductManager("src/models/product.json");
const products = [];

socketRoutes.get("/" , async (req,res) =>{
    const consult = await prod.getProduct();
    products.push(...consult)
    res.render("home",{
        titulo: "Home Handlebars",
        Products: products
    })
})



export default socketRoutes