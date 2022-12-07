const Categorys = require("../model/category");
const Mobiles = require("../model/mobiles");
const Electronics = require("../model/electronics");
const { Op } = require("sequelize");

//Create operation
const add = async (req, res) => {
  try {
    let resp;
    if (req.body && Array.isArray(req.body)) {
      resp = await Categorys.bulkCreate(req.body, {
        include: [
          {
            model: Mobiles,
          },
          {
            model: Electronics,
          },
        ],
      });
      console.log("if block executed");
    } else {
      resp = await Categorys.create(req.body, {
        include: [
          {
            model: Mobiles,
          },
          {
            model: Electronics,
          },
        ],
      });
      console.log("else block executed");
    }

    res.send(resp);
  } catch (error) {
    console.log(error);
  }
};
//Getting data from db

const findAll = async (req, res) => {
  try {
    console.log("if block executed");
    let resp;
    //Getting one records
    if (req.body.id) {
      resp = await Categorys.findAll({
        where: {
          id: req.body.id,
        },

        include: [
          {
            model: Mobiles,
          },
          {
            model: Electronics,
          },
        ],
      });
      console.log("If block");
    }
    //Getting all records
    else {
      resp = await Categorys.findAll({
        include: [
          {
            model: Mobiles,
          },
          {
            model: Electronics,
          },
        ],
      });
      console.log("Else block");
    }

    res.send(resp);
    console.log(resp);
  } catch (error) {}
};

//Pagination with filter

const pagination = async (req, res) => {
  try {
    const { size, skip } = req.body;

    const resp = await Categorys.findAll({
      where: {
        id: req.body.id,
      },
      include: [
        {
          model: Mobiles,
          where: {
            [Op.or]: [
              {
                brand_name: {
                  [Op.like]: `%${req.body.m_name}%`,
                },
              },
              {
                storage: {
                  [Op.like]: `%${req.body.storage}%`,
                },
              },
            ],
          },
          limit: size,
          offset: skip,
        },
        //Electronics model
        {
          model: Electronics,
          where: {
            [Op.or]: [
              {
                p_name: {
                  [Op.like]: `%${req.body.p_name}%`,
                },
              },
              {
                capacity: {
                  [Op.like]: `%${req.body.capacity}%`,
                },
              },
            ],
          },
          limit: size,
          offset: skip,
        },
      ],
    });
    res.send(resp);
  } catch (error) {
    console.log(error);
  }
};

//Delete Operation

const remove = async (req, res) => {
  try {
    let resp;
    if (req.body.id) {
      resp = await Categorys.destroy({
        where: {
          id: req.body.id,
        },
      });
      console.log("if block");
    } else {
      resp = await Categorys.destroy({
        where: {},
      });
      console.log("else block");
    }

    res.status(200).json({ Response: resp, message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};
module.exports = {
  add,
  findAll,
  pagination,
  remove,
};
