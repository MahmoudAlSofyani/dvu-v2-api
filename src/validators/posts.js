const { check, param } = require("express-validator");

exports.postsValidator = (action) => {
  switch (action) {
    case "create":
      return [
        check("title")
          .exists()
          .withMessage("validations.advertisement.title")
          .not()
          .isEmpty()
          .isString(),
        check("description")
          .exists()
          .withMessage("validations.advertisement.description")
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
