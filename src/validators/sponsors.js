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
          .withMessage("validations.sponsor.code")
          .not()
          .isEmpty()
          .isString(),
      ];
  }
};
