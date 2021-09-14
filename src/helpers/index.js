const { User, Car, Sponsor, Event } = require("../db/models");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const fs = require("fs");

exports.generateCode = async (moduleName, length) => {
  let code;
  let count = 0;

  switch (moduleName) {
    case "User": {
      const prefix = "USER_";
      do {
        code = prefix + uuidv4();
        count = await User.count({ where: { code } });
      } while (count > 0);
      return code.split("-")[0];
    }
    case "Car": {
      const prefix = "CAR_";
      do {
        code = prefix + uuidv4();
        count = await Car.count({ where: { code } });
      } while (count > 0);
      return code.split("-")[0];
    }
    case "Sponsor": {
      const prefix = "SPONSOR_";
      do {
        code = prefix + uuidv4();
        count = await Sponsor.count({ where: { code } });
      } while (count > 0);
      return code.split("-")[0];
    }
    case "Event": {
      const prefix = "EVENT_";
      do {
        code = prefix + uuidv4();
        count = await Sponsor.count({ where: { code } });
      } while (count > 0);
      return code.split("-")[0];
    }
  }
};

exports.isUniqueUser = async (email, mobile, whatsApp) => {
  const count = await User.count({
    where: {
      [Op.or]: [
        {
          email,
        },
        {
          mobile,
        },
        {
          whatsApp,
        },
      ],
    },
  });

  if (count > 0) return false;
  else return true;
};

exports.generateResponse = (
  err,
  req,
  next,
  status = null,
  msg = null,
  data = null
) => {
  const error = Error();
  error.status = status || 500;
  error.message = req.polyglot.t(msg || "general.error");
  error.stack = err || null;
  error.data = data;
  next(error);
};

exports.getToken = (req, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    } else {
      return null;
    }
  } catch (err) {
    this.generateError(err, req, next);
  }
};

exports.isActiveAccount = (user) => {
  if (user.isActive) return true;
  else return false;
};

exports.generateUrlSlug = (title, req, next) => {
  try {
    let titleUrl = title
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");

    return titleUrl;
  } catch (err) {
    this.generateError(err, req, next, null, "general.errorSlug");
  }
};

exports.allowedImages = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
