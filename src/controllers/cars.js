const {
  CarColor,
  CarModel,
  CarMake,
  PlateSource,
  PlateCode,
  Car,
} = require("../db/models");
const { generateResponse } = require("../helpers");
const { v4: uuidv4 } = require("uuid");

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

exports.createNewCar = async (req, res, next) => {
  try {
    const { user } = req;

    const {
      carMake,
      carYear,
      carModel,
      carColor,
      plateCode,
      plateSource,
      plateNumber,
      vinNumber,
    } = req.body;

    const _carMake = await CarMake.findOne({
      where: { uid: carMake },
    });
    const _carModel = await CarModel.findOne({
      where: { uid: carModel },
    });
    const _carColor = await CarColor.findOne({
      where: { uid: carColor },
    });
    const _plateCode = await PlateCode.findOne({
      where: { uid: plateCode },
    });
    const _plateSource = await PlateSource.findOne({
      where: { uid: plateSource },
    });

    const _car = await Car.create({
      uid: uuidv4(),
      carMakeId: _carMake.id,
      carModelId: _carModel.id,
      carColorId: _carColor.id,
      year: carYear,
      plateSourceId: _plateSource.id,
      plateCodeId: !_plateCode ? 49 : _plateCode.id,
      otherPlateCode: !_plateCode ? plateCode : null,
      vinNumber,
      plateNumber,
      userId: user.id,
    });

    if (_car)
      return res.status(200).send({
        ..._car.toJSON(),
        carColor: await _car.getCarColor(),
        carModel: await _car.getCarModel(),
        carMake: await _car.getCarMake(),
        plateCode: await _car.getPlateCode(),
        plateSource: await _car.getPlateSource(),
      });
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.deleteCarByUid = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const { user } = req;

    const _car = await Car.findOne({ where: { uid } });

    if (_car) {
      if (await user.hasCars(_car)) {
        //delete it

        const _count = await Car.destroy({
          where: {
            uid,
          },
        });

        res.status(200).send({ count: _count });
      } else generateResponse(null, req, next, 403, "validations.car.notOwn");
    } else generateResponse(null, req, next, 404, "validations.car.notFound");
  } catch (err) {
    generateResponse(err, req, next);
  }
};
