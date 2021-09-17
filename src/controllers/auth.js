const jwt = require("jsonwebtoken");
const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const {
  generateResponse,
  isActiveAccount,
  generateCode,
  isUniqueUser,
} = require("../helpers");

//Login route, used to verify credentials sent and generate a token

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

// used for users registering on the website. Here they set their own password

exports.register = async (req, res, next) => {
  try {
    const code = generateCode(req, next, "user");
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
      const _user = await User.create({ code, ...req.body }, options);
      return res.status(200).send(_user);
    } else generateResponse(null, req, next, 400, "validations.user.notUnique");
  } catch (err) {
    generateResponse(err, req, next);
  }
};
