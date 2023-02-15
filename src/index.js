import express from "express";
import cartRoutes from "./routes/cart.js";
import productRoutes from "./routes/product.js";
import {__dirname} from './path.js';
import * as path from 'path';
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import socketRoutes from "./routes/socket.js";
import ProductManager  from "../src/controllers/productManager.js";

const app = express();
const PORT = 8080;
const server = app.listen(PORT,() => {
    console.log("Server up and running in port: " + PORT );
});


const io = new Server(server);
const prod = new ProductManager("src/models/product.json");

// Middlewares 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.engine("handlebars", engine()) 
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname, "./views"))

 io.on("connection",  (socket) =>{
    console.log("Conexion con socket");

    socket.on("add-product", async newProduct =>{
        const {title,description,price,thumbnail,code,stock,category } = newProduct
        await prod.addProduct(title,description,price,thumbnail,code,stock,category)  
        const prods = await prod.getProduct();
        socket.emit("update-products", prods);
    }) 
}) 

// Routes

app.use('/', express.static(__dirname + '/public'))
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/realTimeProducts", socketRoutes);

