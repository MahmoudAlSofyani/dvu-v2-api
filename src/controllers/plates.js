const { PlateCode, PlateSource } = require("../db/models");
const { generateResponse } = require("../helpers");

exports.getAllPlateSources = async (req, res, next) => {
  try {
    const plateSources = await PlateSource.findAll();
    return res.status(200).send(plateSources);
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.getPlateCodesBySource = async (req, res, next) => {
  try {
    const { source } = req.params;
    const plateCodes = await PlateCode.findAll({
      include: [
        {
          model: PlateSource,
          where: {
            uid: source.toUpperCase(),
          },
          attributes: [],
        },
      ],
    });
    return res.status(200).send(plateCodes);
  } catch (err) {
    generateResponse(err, req, next);
  }
};
