const { check, param } = require("express-validator");

exports.commentsValidator = (action) => {
  switch (action) {
    case "create":
      return [
        check("details")
          .exists()
          .withMessage("validations.advertisement.title")
          .not()
          .isEmpty()
          .isString(),
        check("post")
          .exists()
          .withMessage("validations.advertisement.price")
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
