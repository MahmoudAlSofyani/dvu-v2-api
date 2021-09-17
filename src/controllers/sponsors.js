const { Sponsor } = require("../db/models");
const {
  generateResponse,
  generateCode,
  generateUrlSlug,
} = require("../helpers");
const { Op } = require("sequelize");

exports.searchSponsors = async (req, res, next) => {
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
                    name: { [Op.like]: `%${value}%` },
                  },
                  {
                    url: { [Op.like]: `%${value}%` },
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

    Sponsor.scope("full")
      .findAll({ where: whereObj, limit })
      .then((_users) => {
        res.status(200).send(_users);
      })
      .catch((err) => generateResponse(err, req, next));
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.createSponsor = async (req, res, next) => {
  try {
    const { file } = req;
    const { name } = req.body;
    let options = {
      logo: file,
    };

    const _sponsor = await Sponsor.create(
      {
        code: await generateCode(req, next, "sponsor"),
        url: generateUrlSlug(name),
        ...req.body,
      },
      options
    );
    res.status(200).send(_sponsor);
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.updateSponsorByCode = async (req, res, next) => {
  try {
    const { code } = req.params;
    const { file } = req;

    let options = {
      logo: file,
      individualHooks: true,
    };

    const [count, [_updatedSponsor]] = await Sponsor.update(
      { ...req.body },
      { ...options, where: { code } }
    );

    if (_updatedSponsor) {
      res.status(200).send({ ..._updatedSponsor.toJSON() });
    } else
      generateResponse(null, req, next, 400, "validations.sponsor.notFound");
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.deleteSponsors = async (req, res, next) => {
  try {
    const { codes } = req.body;

    const _count = await Sponsor.destroy({
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
