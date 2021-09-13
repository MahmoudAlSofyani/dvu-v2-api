const fs = require("fs");

exports.deleteFile = (filename) => {
  if (filename) {
    fs.unlink(`uploads/${filename}`, (err) => {
      if (err) this.generateResponse(err, req, next);
    });
  }
};
