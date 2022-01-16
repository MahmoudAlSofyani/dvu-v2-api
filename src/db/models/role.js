"use strict";
const BaseModel = require("./base");
module.exports = (sequelize, DataTypes) => {
  class Role extends BaseModel {
    PROTECTED_ATTRIBUTES = ["id", "UserRole"];
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {
        through: {
          model: models.UserRole,
          foreignKey: "roleId",
        },
      });
    }
  }
  Role.init(
    {
      uid: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Role",
      underscored: true,
      timestamps: false,
    }
  );
  return Role;
};
