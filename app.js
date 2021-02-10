const db = require("./db/models");
const productRoute = require("./routes/products");
const express = require("express");

const app = express();

//Middleware
app.use(express.json());
app.use("/products",productRoute);



    //db.sequelize.sync();
    db.sequelize.sync({alter: true});
    //db.sequelize.sync({force: true});

  app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });