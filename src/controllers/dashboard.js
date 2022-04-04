const { User, Event, Advertisement } = require("../db/models");
const { generateResponse } = require("../helpers");
const { Op } = require("sequelize");
const moment = require("moment");

exports.getMemberStatistics = async (req, res, next) => {
  try {
    const _total = await User.count();
    const _active = await User.count({
      where: {
        [Op.and]: [
          {
            isActive: true,
          },
          {
            isApproved: true,
          },
        ],
      },
    });
    const _pending = await User.count({
      where: {
        [Op.and]: [
          {
            isApproved: false,
          },
          {
            purgedDate: null,
          },
        ],
      },
    });

    return res
      .status(200)
      .send({ total: _total, active: _active, pending: _pending });
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.getAdvertisementStatistics = async (req, res, next) => {
  try {
    const _total = await Advertisement.count();
    const _sold = await Advertisement.count({
      where: {
        [Op.and]: [
          {
            isSold: true,
          },
          {
            isVerified: true,
          },
        ],
      },
    });
    const _notVerified = await Advertisement.count({
      where: {
        [Op.and]: [
          {
            isVerified: false,
          },
          {
            isSold: false,
          },
        ],
      },
    });

    return res
      .status(200)
      .send({ total: _total, sold: _sold, notVerified: _notVerified });
  } catch (err) {}
};

exports.getEventsStatistics = async (req, res, next) => {
  try {
    const _total = await Event.count();
    const _upcoming = await Event.count({
      where: {
        date: { [Op.gte]: moment().toDate() },
      },
    });
    const _past = await Event.count({
      where: {
        date: { [Op.lte]: moment().toDate() },
      },
    });

    return res
      .status(200)
      .send({ total: _total, upcoming: _upcoming, past: _past });
  } catch (err) {
    generateResponse(err, req, next);
  }
};
