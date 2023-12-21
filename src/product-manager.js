const fs = require("fs").promises;

class ProductManager {

    static ultId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
    }


    async addProduct(nuevoObjeto) {
        let { title, description, price, img, code, stock } = nuevoObjeto;

        if (!title || !description || !price || !img || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }


        if (this.products.some(item => item.code === code)) {
            console.log("El codigo debe ser unico");
            return;
        }



        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            img,
            code,
            stock
        }



        this.products.push(newProduct);

        await this.guardarArchivo(this.products);

    }

    getProducts() {
        console.log(this.products);
    }

    getProductById(id) {
        const product = this.products.find(item => item.id === id);

        if (!product) {
            console.log("Producto no encontrado");
        } else {
            console.log("Siiiiii, lo encontramos: ", product);
        }

    }

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;
        } catch (error) {
            console.log("Error al guardar el archivo", error);
        }

    }

    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
        } catch (error) {
            console.log("Error al guardar el archivo", error);
        }
    }


}

const manager = new ProductManager("./productos.json");

manager.getProducts();


const alimentoPerro = {
    title: "dogchow",
    description: "lo mejor para tu perro",
    price: 200,
    img: "sin imagen",
    code: "abc123",
    stock: 50
}

manager.addProduct(alimentoPerro);

const alimentoGato = {
    title: "catchow",
    description: "lo mejor para tu gato",
    price: 400,
    img: "sin imagen",
    code: "abc124",
    stock: 30
}

manager.addProduct(alimentoGato);

manager.getProducts();
