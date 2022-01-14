const {
  User,
  Car,
  Sponsor,
  Event,
  Announcement,
  Advertisement,
  Post,
  Comment,
} = require("../db/models");
const { Op } = require("sequelize");
const generator = require("generate-password");

exports.generateCode = (req, next, moduleName) => {
  try {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let code = "";

    switch (moduleName) {
      case "user":
        code = "user_";
        break;
      case "car":
        code = "car_";
        break;
      case "sponsor":
        code = "sponsor_";
        break;
      case "event":
        code = "event_";
        break;
      case "announcement":
        code = "announcement_";
        break;
      case "advertisement":
        code = "advertisement_";
        break;
      case "post":
        code = "post_";
        break;
      case "comment":
        code = "comment_";
        break;
      default:
        code = "code_";
        break;
    }

    do {
      for (let i = 0; i < 5; i++) {
        const randomNum = Math.floor(Math.random() * chars.length);
        code += chars.substring(randomNum, randomNum + 1);
      }

      switch (moduleName) {
        case "user":
          User.count({ where: { code } })
            .then((_count) => (code = _count > 0 ? "user_" : code))
            .catch((err) => this.generateResponse(err, req, next));
          break;
        case "car":
          Car.count({ where: { code } })
            .then((_count) => (code = _count > 0 ? "car_" : code))
            .catch((err) => this.generateResponse(err, req, next));
          break;
        case "sponsor":
          Sponsor.count({ where: { code } })
            .then((_count) => (code = _count > 0 ? "sponsor_" : code))
            .catch((err) => this.generateResponse(err, req, next));
          break;
        case "event":
          Event.count({ where: { code } })
            .then((_count) => (code = _count > 0 ? "event_" : code))
            .catch((err) => this.generateResponse(err, req, next));
          break;
        case "announcement":
          Announcement.count({ where: { code } })
            .then((_count) => (code = _count > 0 ? "announcement_" : code))
            .catch((err) => this.generateResponse(err, req, next));
          break;
        case "advertisement":
          Advertisement.count({ where: { code } })
            .then((_count) => (code = _count > 0 ? "advertisement_" : code))
            .catch((err) => this.generateResponse(err, req, next));
          break;
        case "post":
          Post.count({ where: { code } })
            .then((_count) => (code = _count > 0 ? "post_" : code))
            .catch((err) => this.generateResponse(err, req, next));
          break;
        case "comment":
          Comment.count({ where: { code } })
            .then((_count) => (code = _count > 0 ? "comment_" : code))
            .catch((err) => this.generateResponse(err, req, next));
          break;
        default:
          break;
      }
    } while (code.length === 0);
    return code;
  } catch (err) {
    this.generateResponse(err, req, next);
    return null;
  }
};

exports.isUniqueUser = async (email, mobile, whatsApp) => {
  const count = await User.count({
    where: {
      [Op.or]: [
        {
          email : email || "",
        },
        {
          mobile: mobile || "",
        },
        {
          whatsApp : whatsApp || "",
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

exports.generateUrlSlug = (title, code, req, next) => {
  try {
    let titleUrl = title
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");

    if (code) return titleUrl + "-" + code;
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
