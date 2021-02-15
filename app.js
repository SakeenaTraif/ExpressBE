const db = require("./db/models");
const productRoute = require("./routes/products");
const express = require("express");

const app = express();

//Middleware
app.use(express.json());
app.use("/products",productRoute);

//Not Found Middleware
app.use((req,res,next) =>{
  next({
    status:404,
    message:"Path Not Found",
  });
});

//Error Handling Middleware
app.use((err,req,res,next) =>{
  res
  .status(err.status || 500)
  .json({message : err.message || "Internal Server Error",});
});



    //db.sequelize.sync();
    db.sequelize.sync({alter: true});
    //db.sequelize.sync({force: true});

  app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });