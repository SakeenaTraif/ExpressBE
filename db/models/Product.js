const SequelizeSlugify = require("sequelize-slugify");

module.exports =(sequelize,DataTypes) => {
    const Product=  sequelize.define("Product",{
        name: { type: DataTypes.STRING , allowNull: false },
        slug: { type: DataTypes.STRING ,  unique: true},
        price: { type: DataTypes.DOUBLE , defaultValue: 0 , validate: {min: 0,}},
        image: { type: DataTypes.STRING, isUrl: true},
        description: { type: DataTypes.STRING },
    });

    SequelizeSlugify.slugifyModel(Product, {
        source: ["name"]
      });

    return Product;
};