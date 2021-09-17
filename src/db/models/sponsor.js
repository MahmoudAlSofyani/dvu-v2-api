"use strict";
const { deleteFile } = require("../../helpers/delete-file");
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class Sponsor extends BaseModel {
    PROTECTED_ATTRIBUTES = ["id", "createdAt", "updatedAt", "fileId"];
    static associate(models) {
      this.belongsTo(models.File, {
        as: "logo",
        foreignKey: "fileId",
      });
    }
  }
  Sponsor.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      url: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Sponsor",
      paranoid: true,
      underscored: true,
      scopes: {
        full: {
          include: ["logo"],
        },
        logo: {
          include: ["logo"],
        },
      },
      hooks: {
        beforeCreate: async (sponsor, options) => {
          if (sponsor && options) {
            const { logo, url } = options;

            if (url) sponsor.setDataValue("url", url);

            if (logo) {
              const _logo = await sequelize.models.File.create({
                code: logo.filename,
                name: logo.originalname,
                type: logo.mimetype,
                size: logo.size,
              });

              if (_logo) sponsor.setDataValue("fileId", _logo.id);
            }
          }

          return sponsor;
        },
        beforeUpdate: async (sponsor, options) => {
          if (sponsor && options) {
            const { logo, url } = options;

            if (url) sponsor.setDataValue("url", url);

            if (logo) {
              const _oldLogo = await sponsor.getLogo();

              deleteFile(_oldLogo.code);
              await _oldLogo.destroy();

              const _newLogo = await sequelize.models.File.create({
                code: logo.filename,
                name: logo.originalname,
                type: logo.mimetype,
                size: logo.size,
              });

              if (_newLogo) sponsor.setDataValue("fileId", _newLogo.id);
            }
          }
          return sponsor;
        },
      },
    }
  );
  return Sponsor;
};
