const { CarColor, CarModel, CarMake } = require("../db/models");
const { generateResponse } = require("../helpers");

exports.getAllCarMakes = async (req, res, next) => {
  try {
    const carMakes = await CarMake.findAll();
    return res.status(200).send(carMakes);
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.getAllModelsByMake = async (req, res, next) => {
  try {
    const { make } = req.params;
    const carModels = await CarModel.findAll({
      include: [
        {
          model: CarMake,
          where: {
            uid: make.toUpperCase(),
          },
          attributes: [],
        },
      ],
    });

    return res.status(200).send(carModels);
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.getAllCarColors = async (req, res, next) => {
  try {
    const carColors = await CarColor.findAll();
    return res.status(200).send(carColors);
  } catch (err) {
    generateResponse(err, req, next);
  }
};
