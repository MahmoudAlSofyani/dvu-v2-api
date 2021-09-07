const { check } = require("express-validator");

exports.usersValidator = (action) => {
  switch (action.toLowerCase()) {
    case "create":
      return [
        check("firstName")
          .exists()
          .withMessage("validations.user.firstName")
          .not()
          .isEmpty()
          .withMessage("general.empty")
          .isString()
          .withMessage("general.notString"),
        check("lastName")
          .exists()
          .withMessage("validations.user.lastName")
          .not()
          .isEmpty()
          .withMessage("general.empty")
          .isString()
          .withMessage("general.notString"),
        check("email")
          .exists()
          .withMessage("validations.user.email")
          .not()
          .isEmpty()
          .withMessage("general.empty")
          .isString()
          .withMessage("general.notString")
          .isEmail()
          .withMessage("general.invalidEmail"),
        check("password")
          .exists()
          .withMessage("validations.user.password")
          .not()
          .isEmpty()
          .withMessage("general.empty")
          .isString()
          .withMessage("general.notString"),
        check("mobile")
          .exists()
          .withMessage("validations.user.mobile")
          .not()
          .isEmpty()
          .withMessage("general.empty")
          .isString()
          .withMessage("general.notString"),
        check("whatsApp")
          .exists()
          .withMessage("validations.user.whatsApp")
          .not()
          .isEmpty()
          .withMessage("general.empty")
          .isString()
          .withMessage("general.notString")
          .optional(),
      ];
  }
};
