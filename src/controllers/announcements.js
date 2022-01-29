const { Announcement } = require("../db/models");
const { generateResponse, generateUrlSlug } = require("../helpers");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

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
    const uid = uuidv4();
    let options = {
      poster: file,
      url: title ? generateUrlSlug(title, uid, req, next) : null,
    };

    const _announcement = await Announcement.create(
      {
        uid,
        ...req.body,
      },
      options
    );
    res.status(200).send(_announcement);
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.updateAnnouncementByUid = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const { file } = req;
    const { title } = req.body;

    let options = {
      poster: file,
      individualHooks: true,
      url: title ? generateUrlSlug(title, uid, req, next) : null,
    };

    const [count, [_updatedAnnouncement]] = await Announcement.update(
      { ...req.body },
      { ...options, where: { uid } }
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
    const { uids } = req.body;

    const _count = await Announcement.destroy({
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

exports.getAllAnnouncements = async (req, res, next) => {
  try {
    const _announcements = await Announcement.scope("full").findAll();

    res.status(200).send(_announcements);
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.getAnnouncementByUid = async (req, res, next) => {
  try {
    const { uid } = req.params;

    const _announcement = await Announcement.scope("full").findOne({
      where: { uid },
    });

    res.status(200).send(_announcement);
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.handleAnnouncementsVisibility = async (req, res, next) => {
  try {
    const { uid } = req.params;

    const _announcement = await Announcement.findOne({ where: { uid } });

    if (_announcement) {
      _announcement.isPublished = !_announcement.isPublished;
      await _announcement.save();
      return res.status(200).send(_announcement);
    } else
      generateResponse(
        null,
        req,
        next,
        404,
        "validations.announcement.notFound"
      );
  } catch (err) {
    generateResponse(err, req, next);
  }
};
