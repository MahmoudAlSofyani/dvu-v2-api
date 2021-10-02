const multer = require("multer");
const { generateResponse, allowedImages } = require("../helpers");
const { File } = require("../db/models");
const fs = require("fs");

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

exports.streamFile = (req, res, next) => {
  try {
    let { code } = req.params;

    if (code.includes(".")) {
      let cleanedCode = code.split(".");
      code = cleanedCode[0];
    }

    File.findOne({ where: { code }, paranoid: false }).then((_data) => {
      if (_data) {
        const path = `${__basedir}/uploads/${code}`;
        const stat = fs.statSync(path);
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
          const parts = range.replace(/bytes=/, "").split("-");
          const start = parseInt(parts[0], 10);
          const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
          const chunksize = end - start + 1;
          const file = fs.createReadStream(path, { start, end });
          const head = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": _data.type,
            "Cache-Control": "no-cache",
            "Content-Disposition": `attachment; filename=${_data.name}`,
            Pragma: "no-cache",
          };
          res.writeHead(206, head);
          file.pipe(res);
        } else {
          const head = {
            "Content-Length": fileSize,
            "Content-Type": _data.type,
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          };
          res.writeHead(200, head);
          fs.createReadStream(path).pipe(res);
        }
      } else generateResponse(null, req, next, 404, "general.fileNotFound");
    });
  } catch (err) {
    generateResponse(err, req, next);
  }
};
