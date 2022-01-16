const jwt = require("jsonwebtoken");
const { User, PasswordResetToken } = require("../db/models");
const bcrypt = require("bcrypt");
const { generateResponse, isActiveAccount } = require("../helpers");
const moment = require("moment");

//Login route, used to verify credentials sent and generate a token

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const _user = await User.findOne({ where: { email } });

    if (_user) {
      if (!isActiveAccount(_user))
        return generateResponse(null, req, next, 403, "general.notActive");

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
          res.status(200).send({
            token,
            user: { ..._user.toJSON(), roles: await _user.getRoles() },
          });
        }
      } else generateResponse(null, req, next, 401, "general.denied");
    } else generateResponse(null, req, next, 401, "general.denied");
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    console.log("TOKEN: ", token);

    const _token = await PasswordResetToken.findOne({ where: { token } });

    if (_token) {
      if (!moment(_token.tokenExpiry).isBefore(moment())) {
        const _user = await User.findByPk(_token.userId);

        const options = {
          password,
        };

        await _user.save(options);

        return res.status(200).send({ msg: "Password changed successfully" });
      } else
        return generateResponse(
          null,
          req,
          next,
          400,
          "validations.auth.expiredToken"
        );
    } else
      return generateResponse(
        null,
        req,
        next,
        400,
        "validations.auth.expiredToken"
      );
  } catch (err) {
    generateResponse(err, req, next);
  }
};
exports.changePassword = async (req, res, next) => {};
