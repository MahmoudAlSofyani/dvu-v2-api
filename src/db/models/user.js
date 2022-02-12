"use strict";
const BaseModel = require("./base");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { deleteFile } = require("../../helpers/delete-file");
const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  class User extends BaseModel {
    PROTECTED_ATTRIBUTES = [
      "id",
      "updatedAt",
      "deletedAt",
      "password",
      "fileId",
    ];

    static associate(models) {
      this.hasMany(models.Car, { as: "cars", foreignKey: "userId" });
      this.belongsToMany(models.Role, {
        as: "roles",
        through: {
          model: models.UserRole,
          foreignKey: "userId",
        },
      });

      this.belongsToMany(models.Event, {
        as: "events",
        through: {
          model: models.UserEvent,
          foreignKey: "userId",
        },
      });

      this.belongsTo(models.File, {
        as: "profilePicture",
        foreignKey: "fileId",
      });

      this.hasMany(models.Advertisement, {
        as: "advertisements",
        foreignKey: "userId",
      });

      this.hasMany(models.PasswordResetToken, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      uid: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      mobile: DataTypes.STRING,
      whatsApp: DataTypes.STRING,
      instagram: DataTypes.STRING,
      points: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
      mobileCountryCode: DataTypes.STRING,
      whatsappCountryCode: DataTypes.STRING,
      approvedDate: DataTypes.DATE,
      purgedDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
      underscored: true,
      scopes: {
        full: {
          include: [
            "roles",
            "cars",
            "events",
            "profilePicture",
            "advertisements",
          ],
        },
        roles: {
          include: ["roles"],
        },
        cars: {
          include: ["cars"],
        },
        events: {
          include: ["events"],
        },
        profilePicture: {
          include: ["profilePicture"],
        },
        advertisements: {
          include: ["advertisements"],
        },
      },
      hooks: {
        beforeCreate: async (user, options) => {
          if (user && options) {
            const { password } = options;

            if (password)
              user.setDataValue("password", bcrypt.hashSync(password, 12));
          }
          return user;
        },
        afterCreate: async (user, options) => {
          if (user && options) {
            const { car } = options;

            const _memberRole = await sequelize.models.Role.findOne({
              where: { name: "MEMBER" },
            });
            if (_memberRole) user.addRole(_memberRole);

            if (car) {
              const {
                carMake,
                carYear,
                carModel,
                carColor,
                plateCode,
                plateSource,
                plateNumber,
                vinNumber,
              } = car;

              const _carMake = await sequelize.models.CarMake.findOne({
                where: { uid: carMake },
              });
              const _carModel = await sequelize.models.CarModel.findOne({
                where: { uid: carModel },
              });
              const _carColor = await sequelize.models.CarColor.findOne({
                where: { uid: carColor },
              });
              const _plateCode = await sequelize.models.PlateCode.findOne({
                where: { uid: plateCode },
              });
              const _plateSource = await sequelize.models.PlateSource.findOne({
                where: { uid: plateSource },
              });

              await sequelize.models.Car.create({
                carMakeId: _carMake.id,
                carModelId: _carModel.id,
                carColorId: _carColor.id,
                year: carYear,
                plateSourceId: _plateSource.id,
                plateCodeId: !_plateCode ? 49 : _plateCode.id,
                otherPlateCode: !_plateCode ? plateCode : null,
                vinNumber,
                plateNumber,
                userId: user.id,
              });
            }
          }
          return user;
        },
        beforeUpdate: async (user, options) => {
          if (user && options) {
            const { password, roles, profilePicture } = options;

            if (user.isActive && !user.approvedDate) {
              user.setDataValue("approvedDate", moment());
            }

            if (!user.isActive && !user.purgedDate) {
              user.setDataValue("purgedDate", moment());
            }

            if (profilePicture) {
              const _oldPicture = await user.getProfilePicture();

              if (_oldPicture) {
                deleteFile(_oldPicture.uid);
                await _oldPicture.destroy();
              }

              const _pic = await sequelize.models.File.create({
                uid: profilePicture.filename,
                name: profilePicture.originalname,
                type: profilePicture.mimetype,
                size: profilePicture.size,
              });

              if (_pic) await user.setProfilePicture(_pic);
            }

            if (roles && roles.length > 0) {
              await user.setRoles([]);

              const _roles = await sequelize.models.Role.findAll({
                where: {
                  uid: {
                    [Op.in]: roles.map((_r) => _r.uid),
                  },
                },
              });

              await user.setRoles(_roles);
            }

            if (password) {
              user.setDataValue("password", bcrypt.hashSync(password, 12));
            }
          }
        },
      },
    }
  );
  return User;
};
