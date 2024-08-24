// @ts-nocheck
"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.User, { foreignKey: "employerId" });
    }
  }

  Job.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      employerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User", // Tên model mà khóa ngoại tham chiếu đến
          key: "id", // Cột mà khóa ngoại tham chiếu đến
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      jobTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      level: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jobType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      minSalary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      maxSalary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      skills: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      jobRequirements: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("visible", "hidden"),
        defaultValue: "visible",
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
      modelName: "Job",
      tableName: "job",
    }
  );

  return Job;
};
