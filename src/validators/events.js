const { check, param } = require("express-validator");

exports.eventsValidator = (action) => {
  switch (action) {
    case "create":
      return [
        check("name")
          .exists()
          .withMessage("validations.event.name")
          .not()
          .isEmpty()
          .isString(),
        check("date")
          .exists()
          .withMessage("validations.event.date")
          .not()
          .isEmpty()
          .isString(),
        check("meetingLocation")
          .exists()
          .withMessage("validations.event.meetingLocation")
          .not()
          .isEmpty()
          .isArray(),
        check("meetingTime")
          .exists()
          .withMessage("validations.event.meetingTime")
          .not()
          .isEmpty()
          .isString(),
        check("meetingName")
          .exists()
          .withMessage("validations.event.meetingName")
          .not()
          .isEmpty()
          .isString(),
        check("details")
          .exists()
          .withMessage("validations.event.details")
          .not()
          .isEmpty()
          .isString(),
        check("isMajor")
          .exists()
          .withMessage("validations.event.isMajor")
          .not()
          .isEmpty()
          .isBoolean(),
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
