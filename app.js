let products = require("./data");
const db = require("./db/models");
const {Product} = require("./db/models");
const express = require("express");

const app = express();
app.use(express.json());

// Create Product Route
app.post("/products", async(req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
   
  });
  
  //ProductList Route
  app.get("/products", async(req, res) => {
    try {
      const _products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] }});
      res.json(_products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  //Product Detail Route 
  app.get("/products/:productId", (req, res) => {
    try {
      const foundProduct = products.find((product)=> product.id === +req.params.productId);
      if (foundProduct){
        res.json(foundProduct);}
        else{
            res.status(404)
            res.json({message: "Product Not Found"});}
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
     
        
  });

  //Delete Route
  app.delete("/products/:productId", async(req, res) => {
    try {
      const foundProduct = await Product.findByPk(req.params.productId);
        if (foundProduct){
           await foundProduct.destroy();
               res.status(204).end();}
               else{
            res.status(404).json({message: "Product Not Found"});
        }
     } catch (error) {
          res.status(500).json({ message: error.message });
        }
        });

    //Update Method
    app.put("/products/:productId", async(req, res) => {
      const { productId } = req.params;
      try {
          const foundProduct = await Product.findByPk(productId);
          if (foundProduct) {
            await foundProduct.update(req.body);
            res.status(204).end();
          } else {
           res.status(404).json({ message: "Product not found" });
  }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    //db.sequelize.sync();
    db.sequelize.sync({alter: true});
    //db.sequelize.sync({force: true});

  app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });