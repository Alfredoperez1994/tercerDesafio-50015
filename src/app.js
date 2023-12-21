const ProductManager = require("./product-manager");
const express = require("express");

const manager = new ProductManager("./src/productos.json");

const app = express();