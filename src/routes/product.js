import { Router } from "express";
import ProductManager  from "../controllers/productManager.js";

function paramValidator(title, description, price, thumbnail, code, stock, category){
    return title == undefined ||description == undefined || price == undefined || thumbnail == undefined ||
     code == undefined || stock == undefined || category == undefined ? false : true ;
}

const productRoutes = Router();
const prod = new ProductManager("src/models/products.json");

productRoutes.get("/", async (request, response) =>{
    const {limit} = request.query; 
    const consult = await prod.getProduct(limit);
    response.send(consult)
});

productRoutes.get("/:id", async (request, response) => {
    const {id} = request.params;
    const consult = await prod.getProductById(id)
    response.send(consult);
});

productRoutes.post("/", async (request, response) =>{
    const {title, description, price, thumbnail, code, stock, category} = request.body
    if(paramValidator(title, description, price, thumbnail, code, stock, category) !== false){
        const consult = await prod.addProduct(title, description, price, thumbnail, code, stock, category);
        response.send(consult)
    }else{
        response.send("Campos incompletos!")
    } 
});

productRoutes.put("/:id", async (request,response) => {
    const { id } = request.params;
    const { title, description, price, thumbnail, code, stock, category } = request.body;
    const consult = await prod.updateProduct(id, title, description, price, thumbnail, code, stock, category)
    response.send(consult);
})

productRoutes.delete("/:id", async (request,response) => {
    const { id } = request.params;
    const consult = await prod.deleteProduct(parseInt(id))
    response.send(consult) 
})

export default productRoutes;
