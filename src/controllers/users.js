const { User } = require("../db/models");
const { generateResponse, isUniqueUser } = require("../helpers");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

exports.getUserByUid = async (req, res, next) => {
  try {
    const { uid } = req.params;

    const _user = await User.scope("full").findOne({ where: { uid } });

    if (_user) return res.status(200).send(_user);
    else
      return generateResponse(
        null,
        req,
        next,
        404,
        "validations.user.notFound"
      );
  } catch (err) {
    generateResponse(err, req, next);
  }
};

/**
 * GET user by token (profile)
 * ALL
 */

exports.getUserProfile = async (req, res, next) => {
  try {
    const { user } = req;

    return res.status(200).send({
      ...user.toJSON(),
      cars: await user.getCars(),
      roles: await user.getRoles(),
    });
  } catch (err) {
    generateResponse(err, req, next);
  }
};

/**
 * PATCH update user profile by token
 * ALL
 */
exports.updateUserProfile = async (req, res, next) => {
  try {
    const { user } = req;
    const { cars } = req.body;

    const options = {
      cars,
      carUids: cars && cars.length > 0 && cars.map((_car) => uuidv4()),
    };

    const _user = await User.findOne({ where: { uid: user.uid } });

    if (_user) {
      for (const _attribute of Object.keys(req.body)) {
        _user[_attribute] = req.body[_attribute];
      }
      await _user.save(options);
      return res.status(200).send(_user);
    } else generateResponse(null, req, next, 404, "validations.user.notFound");
  } catch (err) {
    generateResponse(err, req, next);
  }
};

/**
 * PATCH Update user by uid
 * ADMIN
 */

exports.updateUserByUid = async (req, res, next) => {
  try {
    const { uid } = req.params;

    const { cars } = req.body;

    const options = {
      cars,
      carUids: cars && cars.length > 0 && cars.map((_car) => uuidv4()),
    };

    const _user = await User.findOne({ where: { uid } });

    if (_user) {
      for (const _attribute of Object.keys(req.body)) {
        _user[_attribute] = req.body[_attribute];
      }
      await _user.save(options);
      return res.status(200).send(_user);
    } else generateResponse(null, req, next, 404, "validations.user.notFound");
  } catch (err) {
    generateResponse(err, req, next);
  }
};

/**
 * DELETE user profile by token
 * ALL
 */

exports.deleteUserProfile = async (req, res, next) => {
  try {
    const { user } = req;

    const _count = await User.destroy({
      where: {
        uid: user.uid,
      },
    });

    res.status(200).send({ count: _count });
  } catch (err) {
    generateResponse(err, req, next);
  }
};

/**
 * POST Create new account/user
 * ALL
 */

exports.createUser = async (req, res, next) => {
  try {
    const { password, email, mobile, whatsApp, cars } = req.body;

    const options = {
      password,
      email,
      mobile,
      cars,
      carUids: cars && cars.length > 0 && cars.map((_car) => uuidv4()),
    };

    if (await isUniqueUser(email, mobile, whatsApp)) {
      const _user = await User.create(
        {
          uid: uuidv4(),
          ...req.body,
        },
        options
      );
      return res.status(200).send(_user);
    } else generateResponse(null, req, next, 400, "validations.user.notUnique");
  } catch (err) {
    generateResponse(err, req, next);
  }
};

/**
 * PATCH Update user account status
 * ADMIN
 */

exports.bulkUpdateUsersStatus = async (req, res, next) => {
  try {
    const { uids } = req.body;
    const { isActive } = req.params;

    const _count = await User.update(
      { isActive },
      {
        where: {
          uid: {
            [Op.in]: uids,
          },
        },
        returning: true,
      }
    );

    res.status(200).send({ count: _count });
  } catch (err) {
    generateResponse(err, req, next);
  }
};

/**
 * POST Search for users
 * ADMIN
 */

exports.searchUsers = async (req, res, next) => {
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
                    firstName: { [Op.like]: `%${value}%` },
                  },
                  {
                    lastName: { [Op.like]: `%${value}%` },
                  },
                  {
                    email: { [Op.like]: `%${value}%` },
                  },
                  {
                    mobile: { [Op.like]: `%${value}%` },
                  },
                  {
                    whatsApp: { [Op.like]: `%${value}%` },
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

    User.scope("full")
      .findAll({ where: whereObj, limit })
      .then((_users) => {
        res.status(200).send(_users);
      })
      .catch((err) => generateResponse(err, req, next));
  } catch (err) {
    generateResponse(err, req, next);
  }
};
