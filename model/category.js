const { Sequelize } = require("sequelize");
const sequelize = require("../db");
const electronic = require("./electronics");
const mobile = require("./mobiles");
const category = sequelize.define(
  "Categorys",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
  }
);

category.hasMany(mobile, {
  onDelete: "CASCADE",
});
mobile.belongsTo(category, {
  onDelete: "CASCADE",
});

category.hasMany(electronic, {
  onDelete: "CASCADE",
});
electronic.belongsTo(category, {
  onDelete: "CASCADE",
});

module.exports = category;

//Relations
