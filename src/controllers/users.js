const { User } = require("../db/models");
const {
  generateResponse,
  generateCode,
  isUniqueUser,
} = require("../helpers");
const { Op } = require("sequelize");


/**
 * 
 * @param code req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
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
    
    const {user} = req;
    const {cars} = req.body

    const options = {
      cars,
      carCodes:
        cars &&
        cars.length > 0 &&
        cars.map((_car) => generateCode(req, next, "car")),
    };

    const _user = await User.findOne({ where: { code: user.code } });

    if (_user) {
      for (const _attribute of Object.keys(req.body)) {
        _user[_attribute] = req.body[_attribute];
      }
      await _user.save(options);
      return res.status(200).send(_user);
    } else generateResponse(null, req, next, 404, "validations.user.notFound");

  } catch (err) {
    generateResponse(err, req, next)
  }
}


/**
 * PATCH Update user by code
 * ADMIN
 */

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

/**
 * DELETE user profile by token
 * ALL
 */

exports.deleteUserProfile = async (req, res, next) => {
  try {
    
    const {user} = req;

    const _count = await User.destroy({
      where: {
        code: user.code
      }
    })

    res.status(200).send({count: _count})
    
  } catch (err) {
    generateResponse(err, req, next)
  }
}


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


/**
 * PATCH Update user account status
 * ADMIN
 */

 exports.bulkUpdateUsersStatus = async (req, res, next) => {
  try {
    const { codes } = req.body;
    const {isActive} = req.params;

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









