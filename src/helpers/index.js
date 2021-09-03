const { User } = require("../db/models");
const { v4: uuidv4 } = require("uuid");

exports.generateCode = async (moduleName, length) => {
  let code;
  let count = 0;

  switch (moduleName) {
    case "User": {
      const prefix = "USER_";
      do {
        code = prefix + uuidv4();
        count = await User.count({ where: { code } });
      } while (count > 0);
      return code.split("-")[0];
    }
  }
};

exports.generateResponse = (err, req, next, status, msg) => {
  const error = new Error();
  error.stack = err || "";
  error.message = msg || "";
  error.number = status || 500;
  next(error);
};
