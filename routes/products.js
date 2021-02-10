const express = require("express");
const {productCreate, 
        productList,
        productDetails,  
        productDelete, 
        productUpdate} = require("../controllers/productController");

const route = express.Router();

    // Create Product Route
    route.post("/", productCreate);
    
    //ProductList Route
    route.get("/", productList);
  
    //Product Detail Route 
    route.get("/:productId", productDetails);
  
    //Delete Route
    route.delete("/:productId", productDelete);
  
      //Update Method
      route.put("/:productId", productUpdate);

module.exports = route;