const { check } = require("express-validator");

exports.authValidator = (action) => {
  switch (action) {
    case "login":
      return [
        check("email")
          .exists()
          .withMessage("validations.auth.email")
          .isString()
          .not()
          .isEmpty(),
        check("password")
          .exists()
          .withMessage("validations.auth.password")
          .isString()
          .not()
          .isEmpty(),
      ];
    case "register":
      return [
        check("firstName")
          .exists()
          .withMessage("validations.auth.firstName")
          .isString()
          .not()
          .isEmpty(),
        check("lastName")
          .exists()
          .withMessage("validations.auth.lastName")
          .isString()
          .not()
          .isEmpty(),
        check("email")
          .exists()
          .withMessage("validations.auth.email")
          .isString()
          .not()
          .isEmpty(),
        check("password")
          .exists()
          .withMessage("validations.auth.password")
          .isString()
          .not()
          .isEmpty(),
        check("mobile")
          .exists()
          .withMessage("validations.auth.mobile")
          .isString()
          .not()
          .isEmpty(),
      ];
  }
};
