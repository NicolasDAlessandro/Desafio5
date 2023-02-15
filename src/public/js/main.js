
const socket = io()

const productsDiv = document.getElementById("products");
const productForm = document.getElementById("productForm");
const title = document.getElementById("title");
const description = document.getElementById("description");
const price = document.getElementById("price");
const thumbnail = document.getElementById("thumbnail");
const code = document.getElementById("code");
const stock = document.getElementById("stock");
const category = document.getElementById("category");

productForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    if( !title.value || !description.value || !price.value || !thumbnail.value || !code.value || !stock.value || !category.value){
        alert('Debes completar todos los casilleros!')
    }else{
        const newProduct = {
            title: title.value,
            description: description.value,
            price: price.value,
            thumbnail: thumbnail.value,
            code: code.value,
            stock: stock.value,
            category: category.value,
        }
        socket.emit('add-product', newProduct)
          /*   title.value = "";
            description.value = "";
            price.value = "";
            thumbnail.value = "";
            code.value = "";
            stock.value = "";
            category.value = ""; */
    }
})

socket.on("update-products", (prods) =>{
    console.log(prods)
    const html = prods.map((p) => {
        let renderProd = `
        <div>
            <br>
            <p>${p.title}</p>
            <p>${p.price}</p>
            <p>${p.description}</p>
             <br>
         </div>  
        `        
        return renderProd;
      })
      .join("\n");
    productsDiv.innerHTML = html;
})