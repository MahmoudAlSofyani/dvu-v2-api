const { Event } = require("../db/models");
const {
  generateResponse,
  generateCode,
  generateUrlSlug,
} = require("../helpers");
const { Op } = require("sequelize");

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
    const { name, meetingLocation } = req.body;

    const _event = await Event.create({
      code: await generateCode(req, next, "event"),
      url: generateUrlSlug(name),
      ...req.body,
    });
    res.status(200).send(_event);
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.updateEventByCode = async (req, res, next) => {
  try {
    const { code } = req.params;

    const [count, [_updatedEvent]] = await Event.update(
      { ...req.body },
      { where: { code } }
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
    const { codes } = req.body;

    const _count = await Event.destroy({
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

exports.handleMemberRegisterToEvent = async (req, res, next) => {
  try {
    const { user } = req;
    const { code } = req.body;

    const _event = await Event.findOne({ where: { code } });

    if (_event) {
      if (await _event.hasMember(user)) {
        await _event.removeMember(user);
        return res
          .status(200)
          .send({ msg: "You have successfully unregistered for this event" });
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
