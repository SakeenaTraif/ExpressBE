const express = require("express");
const {productCreate, 
        productList,
        productDetails,  
        productDelete, 
        productUpdate,
        fetchProduct} = require("../controllers/productController");

const route = express.Router();

     // Fetch Route
     route.param("productId", async (req, res, next, productId) => {
      const foundProduct = await fetchProduct(productId, next);
         if (foundProduct) {
        req.product = foundProduct;
         next();
        } else {
          next({
         status: 404,
         message: "No Task Match",
        });
         }
        });

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