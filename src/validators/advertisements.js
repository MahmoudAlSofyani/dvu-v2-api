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
