const { Advertisement } = require("../db/models");
const {
  generateResponse,
  generateCode,
  generateUrlSlug,
} = require("../helpers");
const { Op } = require("sequelize");

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
                    code: { [Op.like]: `%${value}%` },
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
        code: generateCode(req, next, "advertisement"),
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

exports.updateAdvertisementByCode = async (req, res, next) => {
  try {
    const { code } = req.params;
    const { files } = req;
    const { title, deletedImages } = req.body;

    let options = {
      images: files,
      url: title ? generateUrlSlug(title) : null,
      deletedImages,
      individualHooks: true,
    };

    const [count, [_updatedAdvertisement]] = await Advertisement.update(
      { ...req.body },
      { ...options, where: { code } }
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

exports.deleteAdvertisement = async (req, res, next) => {
  try {
    const { codes } = req.body;

    const _count = await Advertisement.destroy({
      where: {
        code: {
          [Op.in]: codes,
        },
      },
    });
    res.status(200).send({ count: _count });
  } catch (err) {
    generateResponse(err, req, next);
  }
};
