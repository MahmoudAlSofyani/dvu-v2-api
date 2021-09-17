const { Announcement } = require("../db/models");
const {
  generateResponse,
  generateCode,
  generateUrlSlug,
} = require("../helpers");
const { Op } = require("sequelize");

exports.searchAnnouncements = async (req, res, next) => {
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
                    details: { [Op.like]: `%${value}%` },
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

    Announcement.scope("full")
      .findAll({ where: whereObj, limit })
      .then((_users) => {
        res.status(200).send(_users);
      })
      .catch((err) => generateResponse(err, req, next));
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.createAnnouncement = async (req, res, next) => {
  try {
    const { file } = req;
    const { title } = req.body;
    let options = {
      logo: file,
      url: title ? generateUrlSlug(title) : null,
    };

    const _announcement = await Announcement.create(
      {
        code: await generateCode(req, next, "announcement"),
        ...req.body,
      },
      options
    );
    res.status(200).send(_announcement);
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.updateAnnouncementByCode = async (req, res, next) => {
  try {
    const { code } = req.params;
    const { file } = req;
    const { title } = req.body;

    let options = {
      logo: file,
      individualHooks: true,
      url: title ? generateUrlSlug(title) : null,
    };

    const [count, [_updatedAnnouncement]] = await Announcement.update(
      { ...req.body },
      { ...options, where: { code } }
    );

    if (_updatedAnnouncement) {
      res.status(200).send({ ..._updatedAnnouncement.toJSON() });
    } else
      generateResponse(
        null,
        req,
        next,
        400,
        "validations.announcement.notFound"
      );
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.deleteAnnouncements = async (req, res, next) => {
  try {
    const { codes } = req.body;

    const _count = await Announcement.destroy({
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
