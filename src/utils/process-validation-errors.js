const { validationResult } = require("express-validator");
const fromEntries = require("object.fromentries");

const translateMessages = (errObj, req) => {
  // Convert the errObj to an Array
  const errArr = Object.entries(errObj);

  // For each array(err), compare the error msg with the polyglot phrases, and replace it.
  errArr.forEach((err) => {
    Object.keys(req.polyglot.phrases).forEach((phrase) => {
      if (phrase == err[1].msg) {
        err[1].msg = req.polyglot.t(phrase);
      }
    });
  });

  return fromEntries(errArr);
};

exports.processValidationError = (req, res, next) => {
  // Verifies if there were validation errors added to the request
  const validationErrors = validationResult(req);

  // If there were errors in the validation
  if (!validationErrors.isEmpty()) {
    // generate validation response
    res.status(400).send({
      data: translateMessages(validationErrors.mapped(), req),
      error: req.polyglot.t("general.validation"),
    });
  } else {
    // If no errors, go!
    next();
  }
};
