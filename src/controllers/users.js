const { User } = require("../db/models");
const {
  generateResponse,
  generateCode,
  isUniqueUser,
  generatePassword,
} = require("../helpers");
const { Op } = require("sequelize");

//For admin use only. This will create a user and a generated password which is sent
// by email to the users email address

exports.createUser = async (req, res, next) => {
  try {
    const { email, mobile, whatsApp, cars } = req.body;

    const options = {
      password: generatePassword(),
      email,
      mobile,
      cars,
      carCodes:
        cars &&
        cars.length > 0 &&
        cars.map((_car) => generateCode(req, next, "car")),
    };

    if (await isUniqueUser(email, mobile, whatsApp)) {
      const _user = await User.create(
        {
          code: generateCode(req, next, "user"),
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
                    code: { [Op.like]: `%${value}%` },
                  },
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

exports.getUserByCode = async (req, res, next) => {
  try {
    const { code } = req.params;

    const _user = await User.scope("full").findOne({ where: { code } });

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

exports.updateUserByCode = async (req, res, next) => {
  try {
    const { code } = req.params;

    const { cars } = req.body;

    const options = {
      cars,
      carCodes:
        cars &&
        cars.length > 0 &&
        cars.map((_car) => generateCode(req, next, "car")),
    };

    const _user = await User.findOne({ where: { code } });

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

exports.bulkUpdateUsersStatus = async (req, res, next) => {
  try {
    const { codes, isActive } = req.body;

    const _count = await User.update(
      { isActive },
      {
        where: {
          code: {
            [Op.in]: codes,
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

exports.deleteUsers = async (req, res, next) => {
  try {
    const { codes } = req.body;

    const _count = await User.destroy({
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
