// @ts-nocheck

"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define associations here
      Application.belongsTo(models.Job, { foreignKey: "jobId", as: "job" });
      Application.belongsTo(models.User, {
        foreignKey: "applicantId",
        as: "applicant",
      });
      Application.belongsTo(models.CV, { foreignKey: "cvId", as: "cv" });
    }
  }

  Application.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      applicantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cvId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("not_contacted", "contacted"),
        defaultValue: "not_contacted",
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
      modelName: "Application",
      tableName: "Application",
    }
  );

  return Application;
};
