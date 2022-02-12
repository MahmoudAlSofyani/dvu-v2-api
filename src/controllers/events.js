const { Event } = require("../db/models");
const { generateResponse, generateUrlSlug } = require("../helpers");
const { Op } = require("sequelize");
const _ = require("lodash");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

exports.searchEvents = async (req, res, next) => {
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

    Event.scope("full")
      .findAll({ where: whereObj, limit })
      .then((_events) => {
        res.status(200).send(_events);
      })
      .catch((err) => generateResponse(err, req, next));
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { file } = req;
    const uid = uuidv4();

    const options = {
      poster: file,
    };

    const _event = await Event.create(
      {
        uid,
        url: generateUrlSlug(name, uid, req, next),
        ...req.body,
      },
      options
    );
    res.status(200).send(_event);
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.updateEventByUid = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const { name } = req.body;
    const { file } = req;

    const options = {
      url: name ? generateUrlSlug(name, uid, req, next) : null,
      individualHooks: true,
      poster: file,
    };

    const [count, [_updatedEvent]] = await Event.update(
      { ...req.body },
      {
        ...options,
        where: { uid },
      }
    );

    if (_updatedEvent) {
      res.status(200).send({ ..._updatedEvent.toJSON() });
    } else generateResponse(null, req, next, 400, "validations.event.notFound");
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.deleteEvents = async (req, res, next) => {
  try {
    const { uids } = req.body;

    const _count = await Event.destroy({
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

exports.handleMemberRegisterToEvent = async (req, res, next) => {
  try {
    const { user } = req;
    const { uid } = req.params;

    const _event = await Event.findOne({ where: { uid } });

    if (_event) {
      if (await _event.hasMember(user)) {
        await _event.removeMember(user);
        return res
          .status(200)
          .send({ msg: "You have been removed from this event" });
      } else {
        await _event.addMember(user);
        return res
          .status(200)
          .send({ msg: "You have successfully registered for this event" });
      }
    } else generateResponse(null, req, next, 400, "validations.event.notFound");
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.getAllUpcomingEvents = async (req, res, next) => {
  try {
    const _events = await Event.scope("upcoming").findAll({
      where: { isPublished: true },
    });

    const _filteredEvents = _.chain(_events)
      .sortBy((_e) => _e.date)
      .filter((_e) => moment(_e.date).isSameOrAfter(moment()));

    res.status(200).send(_filteredEvents);
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.getEventByUid = async (req, res, next) => {
  try {
    const { uid } = req.params;

    const _event = await Event.findOne({
      where: { uid },
    });

    if (!_event)
      generateResponse(null, req, next, 404, "validations.event.notFound");

    res
      .status(200)
      .send({ ..._event.toJSON(), poster: await _event.getPoster() });
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.handleEventVisibility = async (req, res, next) => {
  try {
    const { uid } = req.params;

    const _event = await Event.findOne({ where: { uid } });

    if (_event) {
      _event.isPublished = !_event.isPublished;
      await _event.save();
      return res.status(200).send(_event);
    } else generateResponse(null, req, next, 404, "validations.event.notFound");
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.checkIfUserIsRegisteredForEvent = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const { user } = req;

    const _event = await Event.findOne({ where: { uid } });

    if (!_event)
      return generateResponse(
        null,
        req,
        next,
        404,
        "validations.event.notFound"
      );

    return res.status(200).send({ isRegistered: await user.hasEvents(_event) });
  } catch (err) {
    generateResponse(err, req, next);
  }
};
