let products = require("./data");
const db = require("./db/models");
const express = require("express");

const app = express();
app.use(express.json());

// Create Product Route
app.post("/products", (req, res) => {
    req.body.id = products[products.length - 1 ].id+1;
    products.push(req.body);
    res.status(201).json(req.body);
  });
  
  //ProductList Route
  app.get("/products", (req, res) => {
    res.json(products);
  });

  //Product Detail Route 
  app.get("/products/:productId", (req, res) => {
      const foundProduct = products.find((product)=> product.id === +req.params.productId);
      if (foundProduct){
        res.json(foundProduct);}
        else{
            res.status(404)
            res.json({message: "Product Not Found"});
        }
  });

  //Delete Route
  app.delete("/products/:productId", (req, res) => {
        const foundProduct = products.find((product)=> product.id === +req.params.productId);
        if (foundProduct){
            products = products.filter((product) => product.id !== +req.params.productId);
               res.status(204);
               res.end();}
               else{
            res.status(404)
            res.json({message: "Product Not Found"});
        }
    });

    db.sequelize.authenticate();

  app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });