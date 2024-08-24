"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("job", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      employerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user", // Tên bảng mà khóa ngoại tham chiếu đến
          key: "id", // Cột mà khóa ngoại tham chiếu đến
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      jobTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      level: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jobType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      minSalary: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      maxSalary: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      skills: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      jobRequirements: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("visible", "hidden"),
        defaultValue: "visible",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        onUpdate: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("job");
  },
};
