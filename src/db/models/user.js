"use strict";
const BaseModel = require("./base");
const bcrypt = require("bcrypt");

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
            const { cars, carUids } = options;

            const _memberRole = await sequelize.models.Role.findOne({
              where: { name: "MEMBER" },
            });
            if (_memberRole) user.addRole(_memberRole);

            if (cars && cars.length > 0) {
              await sequelize.models.Car.bulkCreate(
                cars.map((_car, index) => ({
                  uid: carUids[index],
                  userId: user.id,
                  ..._car,
                }))
              );
            }
          }
          return user;
        },
        beforeUpdate: async (user, options) => {
          if (user && options) {
            const { cars, carUids, password, roles } = options;

            if (roles && roles.length > 0) {
              for (const _role of roles) {
                const _r = await sequelize.models.Role.findOne({
                  where: { name: _role },
                });

                if (await user.hasRole(_r)) user.removeRole(_r);
                else user.addRole(_r);
              }
            }

            if (cars && cars.length > 0) {
              await sequelize.models.Car.bulkCreate(
                cars.map((_car, index) => ({
                  uid: carUids[index],
                  userId: user.id,
                  ..._car,
                }))
              );
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
