const jwt = require("jsonwebtoken");
const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const {
  generateResponse,
  isActiveAccount,
  generateCode,
  isUniqueUser,
} = require("../helpers");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const _user = await User.findOne({ where: { email } });

    if (_user) {
      if (!isActiveAccount(_user))
        generateResponse(null, req, next, 401, "general.notActive");

      const isValidPassword = bcrypt.compareSync(password, _user.password);

      if (isValidPassword) {
        const token = jwt.sign(
          {
            code: _user.code,
            email: _user.email,
            roles: await _user.getRoles(),
          },
          process.env.JWT_SECRET_KEY
        );

        if (token) {
          res.status(200).send({ token });
        }
      } else generateResponse(null, req, next, 401, "general.denied");
    }
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.register = async (req, res, next) => {
  try {
    const userCode = await generateCode("User");
    const carCode = await generateCode("Car");
    const { password, email, mobile, whatsApp, car } = req.body;

    const options = {
      carCode,
      password,
      email,
      mobile,
      car,
    };

    if (await isUniqueUser(email, mobile, whatsApp)) {
      const _user = await User.create({ code: userCode, ...req.body }, options);
      return res.status(200).send(_user);
    } else generateResponse(null, req, next, 400, "validations.user.notUnique");
  } catch (err) {
    generateResponse(err, req, next);
  }
};
