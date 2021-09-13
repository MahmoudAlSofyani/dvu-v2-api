const multer = require("multer");
const { generateResponse, allowedImages } = require("../helpers");

exports.singleImage = (req, res, next) => {
  try {
    const upload = multer({
      dest: "uploads/",
      fileFilter: allowedImages,
    }).single("file");

    upload(req, res, (err) => {
      if (req.fileValidationError)
        generateResponse(req.fileValidationError, req, next, 400);
      else {
        const { file } = req;
        if (req.method === "PATCH" || req.method === "PUT") {
          if (file) {
            req.file = file;
            next();
          } else {
            next();
          }
        } else {
          if (file) {
            req.file = file;
            next();
          } else {
            generateResponse(null, req, next, 400, "general.fileUploadError");
          }
        }
      }
    });
  } catch (err) {
    generateResponse(err, req, next);
  }
};

exports.multipleImage = (req, res, next) => {
  try {
    const upload = multer({
      dest: "uploads/",
      fileFilter: allowedImages,
    }).array("files");

    upload(req, res, (err) => {
      if (req.fileValidationError)
        generateResponse(req.fileValidationError, req, next, 400);
      else {
        const { files } = req;

        if (req.method === "PATCH" || req.method === "PUT") {
          if (files) {
            req.files = files;
            next();
          } else {
            next();
          }
        } else {
          if (files) {
            req.files = files;
            next();
          } else {
            generateResponse(null, req, next, 400, "general.fileUploadError");
          }
        }
      }
    });
  } catch (err) {
    generateResponse(err, req, next);
  }
};
