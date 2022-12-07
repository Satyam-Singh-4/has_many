const {Sequelize} = require("sequelize");
const sequelize = require("../db");
const mobile = sequelize.define(
  "Mobiles",
  {
    m_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    brand_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    storage: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
  module.exports= mobile