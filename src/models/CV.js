// @ts-nocheck
"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CV extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CV.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  CV.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User", // Tên model mà khóa ngoại tham chiếu đến
          key: "id", // Cột mà khóa ngoại tham chiếu đến
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      nameCV: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CVFile: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isDefault: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        //defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "CV",
      tableName: "CV",
    }
  );

  return CV;
};
