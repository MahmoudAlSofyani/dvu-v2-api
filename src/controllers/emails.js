const { User, PasswordResetToken } = require("../db/models");
const { isActiveAccount, generateResponse } = require("../helpers");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

exports.sendResetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const _user = await User.findOne({ where: { email } });

    if (_user) {
      if (!isActiveAccount(_user))
        return res.status(200).send({ msg: "Email sent successfully" });

      const _passwordResetToken = await PasswordResetToken.create({
        uid: uuidv4(),
        token: uuidv4(),
        tokenExpiry: moment().add(15, "minutes"),
        userId: _user.id,
      });

      // simulate sending email
      console.log(_passwordResetToken.token);
    }

    return res.status(200).send({ msg: "Email sent successfully" });
  } catch (err) {
    generateResponse(err, req, next);
  }
};
