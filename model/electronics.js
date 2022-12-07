const {Sequelize} = require("sequelize");
const sequelize = require("../db");
const electronic = sequelize.define(
  "Electronics",
  {
    e_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    p_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    capacity: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
  module.exports= electronic