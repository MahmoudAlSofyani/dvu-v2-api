const { check, param } = require("express-validator");

exports.advertisementsValidator = (action) => {
  switch (action) {
    case "create":
      return [
        check("title")
          .exists()
          .withMessage("validations.advertisement.title")
          .not()
          .isEmpty()
          .isString(),
        check("price")
          .exists()
          .withMessage("validations.advertisement.price")
          .not()
          .isEmpty()
          .isNumeric(),
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
