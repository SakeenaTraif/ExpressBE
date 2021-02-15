const {Product} = require("../db/models");


exports.fetchProduct = async (productId, next) => {
  try {
    const foundProduct = await Product.findByPk(productId);
    return foundProduct;
  } catch (error) {
    next(error);
  }
};

exports.productCreate =  async(req, res, next) => {
    try {
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
        next (error); 
        }
    };

exports.productList = async(req, res, next) => {
    try {
      const _products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] }});
      res.json(_products);
    } catch (error) {
      next (error); 
    }
  };

  exports.productDetails = async(req, res, next) => {
    try {
      const foundProduct = await Product.findByPk(req.params.productId);
      if (foundProduct){
        res.json(foundProduct);}
        else{
            next({message: "Product Not Found"});
            // res.status(404)
            // res.json({message: "Product Not Found"});
          }
    } catch (error) {
      next (error); 
    }
  };

  exports.productDelete = async(req, res, next) => {
    try {
      const foundProduct = await Product.findByPk(req.params.productId);
        if (foundProduct){
           await foundProduct.destroy();
               res.status(204).end();}
               else{
            next({message: "Product Not Found"});
        }
     } catch (error) {
        next (error); 
        }
        };

    exports.productUpdate = async(req, res,next) => {
        const { productId } = req.params;
        try {
            const foundProduct = await Product.findByPk(productId);
            if (foundProduct) {
              await foundProduct.update(req.body);
              res.status(204).end();
            } else {
             next({message: "Product Not Found"});
    }
        } catch (error) {
          next (error); 
        }
      };

