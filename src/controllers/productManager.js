import {promises as fs} from "fs"

function paramsValidator(validator){
    const boolean = Object.values(validator).every(prop => prop !== undefined)
    return boolean
}


class ProductManager{
    constructor(path){
        this.path = path
    }

    async addProduct(title, description, price, thumbnail, code, stock, category){
        try {
            const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            const validator = [title, description, price, thumbnail, code, stock, category]
            if(paramsValidator(validator) == true){
                const newProduct = {
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock,
                    category: category,
                    status: true,
                    id: products.length + 1
                }
                products.push(newProduct);
                fs.writeFile(this.path,JSON.stringify(products));
                return newProduct
            }else{
                return {"error":  "Campos incompletos!"}
            }
        } catch (error) {
            return error
        }
    }

    async getProduct(limit){
        try {
            const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            return limit == undefined ? products : products.slice(0, parseInt(limit))
        } catch (error) {
            return error
        }
    }

    async getProductById(id){
        try {
            const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            const filterProduct = products.filter(prod => prod.id == id);
            return filterProduct
        } catch (error) {
            return error
        }
    }

    async updateProduct(id,title, description, price, thumbnail, code, stock){
        try {
            const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            const index = products.findIndex(prod => prod.id == parseInt(id));
            const update = {
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
                id: products[index].id
            }
            if(index !== -1){
                products[index] = update;
                fs.writeFile(this.path,JSON.stringify(products))
                return"Product updated!"
            }else{
                return "Product not found!"
            }
        } catch (error) {
            return error
        }
    }

    async deleteProduct(id){
        try {
            const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            const filterProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(this.path,JSON.stringify(filterProducts));
            return "Product deleted"
        } catch (error) {
            return error
        }
    }
}

export default ProductManager