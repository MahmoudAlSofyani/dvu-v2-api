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
        param("code")
          .exists()
          .withMessage("general.code")
          .not()
          .isEmpty()
          .isString(),
      ];
    case "delete":
      return [
        check("codes")
          .exists()
          .withMessage("general.codes")
          .not()
          .isEmpty()
          .isArray(),
      ];
  }
};
