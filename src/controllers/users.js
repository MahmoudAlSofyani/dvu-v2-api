// Create user
// bulk update user

const { User } = require("../db/models");
const { generateResponse, generateCode } = require("../helpers");
const { Op } = require("sequelize");

exports.createUser = async (req, res, next) => {
  try {
    const code = await generateCode("User");
    const { password, email, mobile } = req.body;

    const options = {
      code,
      password,
      email,
      mobile,
    };

    const _user = await User.create({ ...req.body }, options);

    res.status(200).send(_user);
  } catch (err) {
    if (err.errors) {
      const { errors } = err;
      generateResponse(err, req, next, 400, "Email or Mobile not unique");
    }
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const _users = await User.findAll();

    res.status(200).send(_users);
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.getUserByCode = async (req, res, next) => {
  try {
    const { code } = req.params;

    const _user = await User.findOne({ where: { code } });

    if (_user) return res.status(200).send(_user);
    else return generateResponse(null, req, next, 404, "User not found");
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.updateUserByCode = async (req, res, next) => {
  try {
    const { code } = req.params;

    const _user = await User.findOne({ where: { code } });

    if (_user) {
      for (const _attribute of Object.keys(req.body)) {
        _user[_attribute] = req.body[_attribute];
      }
      await _user.save();
      return res.status(200).send(_user);
    } else generateResponse(null, req, next, 404, "user not found");
  } catch (err) {
    generateResponse(err, req, next);
  }
};

// TODO: Bulk update users - isActive & Role

exports.deleteUsers = async (req, res, next) => {
  try {
    const { codes } = req.body;

    const _users = await User.findAll({
      where: { code: { [Op.in]: codes } },
    });

    if (_users.length > 0) {
      for (const _user of _users) {
        await _user.destroy();
      }
    }
    res.status(200).send({ count: _users.length });
  } catch (err) {
    generateResponse(err, req, next);
  }
};
