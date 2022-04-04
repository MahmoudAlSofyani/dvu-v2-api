const { User } = require("../db/models");
const { Op } = require("sequelize");
const generator = require("generate-password");
const logger = require("morgan");

exports.isUniqueUser = async (email, mobile, whatsApp) => {
  const count = await User.count({
    where: {
      [Op.or]: [
        {
          email: email || "",
        },
        {
          mobile: mobile || "",
        },
        {
          whatsApp: whatsApp || "",
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
  logger.token("error", () => {
    return error.message;
  });
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

exports.isActiveAccount = (user) => user.isActive;

exports.generateUrlSlug = (title, uid, req, next) => {
  try {
    let titleUrl = title
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");

    if (uid) return titleUrl + "-" + uid;
    else return titleUrl;
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

exports.generatePassword = (length = 10) => {
  return generator.generate({
    length,
    numbers: true,
  });
};
