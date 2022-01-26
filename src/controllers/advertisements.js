const { Advertisement } = require("../db/models");
const { generateResponse, generateUrlSlug } = require("../helpers");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

exports.searchAdvertisements = async (req, res, next) => {
  try {
    const { filters, limit } = req.body;
    let whereClause = [];
    let searchClause = null;

    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value && value.length > 0) {
          switch (key) {
            case "search":
              searchClause = {
                [Op.or]: [
                  {
                    uid: { [Op.like]: `%${value}%` },
                  },
                  {
                    title: { [Op.like]: `%${value}%` },
                  },
                  {
                    description: { [Op.like]: `%${value}%` },
                  },
                ],
              };
              break;
          }
        }
      }
    }

    const whereObj =
      searchClause === null
        ? Object.assign({}, whereClause)
        : { ...Object.assign({}, whereClause), ...searchClause };

    Advertisement.scope("full")
      .findAll({ where: whereObj, limit })
      .then((_advertisements) => {
        res.status(200).send(_advertisements);
      })
      .catch((err) => generateResponse(err, req, next));
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.getAllVerifiedAdvertisments = async (req, res, next) => {
  try {
    const _advertisments = await Advertisement.scope("isVerified").findAll();

    return res.status(200).send(_advertisments);
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.createAdvertisement = async (req, res, next) => {
  try {
    const { files, user } = req;
    const { title } = req.body;
    let options = {
      images: files,
      url: title ? generateUrlSlug(title) : null,
    };

    const _advertisement = await Advertisement.create(
      {
        uid: uuidv4(),
        userId: user.id,
        ...req.body,
      },
      options
    );
    res.status(200).send(_advertisement);
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.getAdvertismentByUid = async (req, res, next) => {
  try {
    const { uid } = req.params;

    const _advertisement = await Advertisement.findOne({ where: { uid } });

    if (_advertisement) return res.status(200).send(_advertisement);
    else
      generateResponse(
        null,
        req,
        next,
        404,
        "validations.advertisement.notFound"
      );
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.updateAdvertismentByUid = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const { files } = req;
    const { title, deletedImages } = req.body;

    let options = {
      images: files,
      url: title ? generateUrlSlug(title) : null,
      deletedImages,
      individualHooks: true,
    };

    const [_, [_updatedAdvertisement]] = await Advertisement.update(
      { ...req.body },
      { ...options, where: { uid } }
    );

    if (_updatedAdvertisement) {
      res.status(200).send({ ..._updatedAdvertisement.toJSON() });
    } else
      generateResponse(
        null,
        req,
        next,
        400,
        "validations.advertisement.notFound"
      );
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.markAdvertismentAsSold = async (req, res, next) => {
  try {
    const { uid } = req.params;

    const _advertisment = await Advertisement.findOne({ where: { uid } });

    if (_advertisment) {
      _advertisment.isSold = true;
      await _advertisment.save();

      return res.status(200).send(_advertisment);
    } else
      generateResponse(
        null,
        req,
        next,
        404,
        "validations.advertisment.notFound"
      );
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.deleteAdvertisement = async (req, res, next) => {
  try {
    const { uids } = req.body;

    const _count = await Advertisement.destroy({
      where: {
        uid: {
          [Op.in]: uids,
        },
      },
    });
    res.status(200).send({ count: _count });
  } catch (err) {
    generateResponse(err, req, next);
  }
};
