const { check, param } = require("express-validator");

exports.sponsorsValidator = (action) => {
  switch (action) {
    case "create":
      return [
        check("name")
          .exists()
          .withMessage("validations.sponsor.name")
          .not()
          .isEmpty()
          .isString(),
        check("description")
          .exists()
          .withMessage("validations.sponsor.description")
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
