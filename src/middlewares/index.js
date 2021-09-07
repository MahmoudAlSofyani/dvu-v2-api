const { getToken, generateResponse } = require("../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../db/models");

exports.verifyToken = (req, res, next) => {
  try {
    const _token = getToken(req, res);

    if (_token) {
      const { err, data } = jwt.verify(_token, prcoess.env.JWT_SECRET_KEY);

      if (err) generateResponse(err, req, next, 401, "general.denied");
      else {
        const { code, email } = data;

        const _user = await User.findOne({ where: { code, email } });

        if (_user) {
          req.user = _user;
          next();
        } else generateResponse(null, req, next, 401, "general.denied");
      }
    }
  } catch (err) {
    generateResponse(err, req, next);
  }
};
