const { Role } = require("../db/models");
const { generateResponse } = require("../helpers");

exports.getAllRoles = async (req, res, next) => {
  try {
    const _roles = await Role.findAll();
    return res.status(200).send(_roles);
  } catch (err) {
    generateResponse(err, req, next);
  }
};
