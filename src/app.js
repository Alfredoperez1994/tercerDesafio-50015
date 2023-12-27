const ProductManager = require("./product-manager");
const express = require("express");
const PUERTO = 8080;
const manager = new ProductManager("./src/productos.json");


const app = express();


app.get("/products/:pid", async(req, res) => {

   try {
     let pid = parseInt(req.params.pid);
 
     const buscado = await manager.getProductById(pid);
     if (buscado) {
         res.send(buscado);
     } else {
        return res.send("producto no encontrado");
     }
 
   } catch (error) {
    console.log(error);
    res.send("ERROR")
   }
})

app.get("/products", async (req, res) => {
    try {
        const arrayProductos = await manager.leerArchivo();
        let limit = parseInt(req.query.limit);
        if(limit) {
            const arrayConLimite = arrayProductos.slice(0, limit);
            return res.send(arrayConLimite);
        }else {
            res.send(arrayProductos);
        }
    } catch (error) {
        console.log("ERROR")
        
    }

})

app.listen(PUERTO, () => {
    console.log(`Escuchando en http://localhost:${PUERTO}`);
})