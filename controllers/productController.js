const {Product} = require("../db/models");

exports.productCreate =  async(req, res) => {
    try {
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    };

exports.productList = async(req, res) => {
    try {
      const _products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] }});
      res.json(_products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.productDetails = async(req, res) => {
    try {
      const foundProduct = await Product.findByPk(req.params.productId);
      if (foundProduct){
        res.json(foundProduct);}
        else{
            res.status(404)
            res.json({message: "Product Not Found"});}
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.productDelete = async(req, res) => {
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
        };

    exports.productUpdate = async(req, res) => {
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
      };

