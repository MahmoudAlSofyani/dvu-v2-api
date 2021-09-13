const { getToken, generateResponse } = require("../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../db/models");
const _ = require("lodash");

exports.verifyMemberToken = (req, res, next) => {
  try {
    const _token = getToken(req, res);

    if (_token) {
      jwt.verify(_token, process.env.JWT_SECRET_KEY, (err, data) => {
        if (err) generateResponse(err, req, next, 401, "general.denied");
        else {
          const { roles } = data;
          const isMember = _.find(roles, { code: "MEMBER" });

          if (isMember) {
            req.user = data;
            next();
          } else generateResponse(null, req, next, 401, "general.denied");
        }
      });
    } else generateResponse(null, req, next, 401, "general.denied");
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.verifyAdminToken = (req, res, next) => {
  try {
    const _token = getToken(req, res);

    if (_token) {
      jwt.verify(_token, process.env.JWT_SECRET_KEY, (err, data) => {
        if (err) generateResponse(err, req, next, 401, "general.denied");
        else {
          const { roles } = data;

          const isAdmin = _.find(roles, { code: "ADMIN" });

          if (isAdmin) {
            req.user = data;
            next();
          } else generateResponse(null, req, next, 401, "general.denied");
        }
      });
    } else generateResponse(null, req, next, 401, "general.denied");
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.verifySponsorToken = (req, res, next) => {
  try {
    const _token = getToken(req, res);

    if (_token) {
      jwt.verify(_token, process.env.JWT_SECRET_KEY, (err, data) => {
        if (err) generateResponse(err, req, next, 401, "general.denied");
        else {
          const { roles } = data;

          const isSponsor = _.find(roles, { code: "SPONSOR" });

          if (isSponsor) {
            req.user = data;
            next();
          } else generateResponse(null, req, next, 401, "general.denied");
        }
      });
    } else generateResponse(null, req, next, 401, "general.denied");
  } catch (err) {
    generateResponse(err, req, next);
  }
};
