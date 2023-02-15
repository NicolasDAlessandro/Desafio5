import {promises as fs} from "fs";

async function listProducts(arr){
    const products = JSON.parse(await fs.readFile("src/models/products.json", "utf-8"));
    const productsInCart = [];
    // hasta aca bien!
    
    arr.forEach(p => {
        const search = products.filter(prod => prod.id == p.id)
        productsInCart.push({
            product: search[0].title, 
            quantity: p.quantity
        })
    })
   
    return productsInCart
}

class CartManager{
    constructor(path){
        this.path = path
    }

    async createCart(){
        try {
            const cart = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            const newCart = {
                id: cart.length  + 1 ,
                products: [],
            };
            cart.push(newCart);
            fs.writeFile(this.path,JSON.stringify(cart));
            return "New cart created! Id: " + (cart.length)
        } catch (error) {
            return error
        }
    }

    async addToCart(cid,pid){
        try {
            const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            const cartIndex = carts.findIndex(cart => cart.id == cid);
            const productIndex = carts[cartIndex].products.findIndex(prod => prod.id == pid);
            productIndex == -1 ? carts[cartIndex].products.push({
                id: pid,
                quantity: 1
            }) : carts[cartIndex].products[productIndex].quantity++;
            fs.writeFile(this.path,JSON.stringify(carts));
            return "Product save in cart!"
        } catch (error) {
            return error
        }
    }

    async getCart(id){
        try {
            const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            const cartIndex = carts.findIndex(cart => cart.id == id);
            const result = await listProducts(carts[cartIndex].products);
            return result
        } catch (error) {
            return error
        }
    }

}

export default CartManager;


/*
const filterProduct = products.filterProduct(prod => prod.id == p.id)
        console.log(p)
        const toAdd = {
            product: filterProduct, 
            quantityt: p.quantity
        }
        productsInCart.push(toAdd);
*/ 