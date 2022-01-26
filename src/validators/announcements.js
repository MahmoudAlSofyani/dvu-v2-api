const { check, param } = require("express-validator");

exports.announcementsValidator = (action) => {
  switch (action) {
    case "create":
      return [
        check("title")
          .exists()
          .withMessage("validations.announcement.title")
          .not()
          .isEmpty()
          .isString(),
        check("details")
          .exists()
          .withMessage("validations.announcement.details")
          .not()
          .isEmpty()
          .isString(),
      ];
    case "update":
      return [
        param("uid")
          .exists()
          .withMessage("general.uid")
          .not()
          .isEmpty()
          .isString(),
      ];
    case "delete":
      return [
        check("uids")
          .exists()
          .withMessage("general.uids")
          .not()
          .isEmpty()
          .isArray(),
      ];
  }
};
