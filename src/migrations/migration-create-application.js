"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Application", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      jobId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Job", // Đảm bảo rằng bảng Job đã được tạo
          key: "id",
        },
      },
      applicantId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "User", // Đảm bảo rằng bảng User đã được tạo
          key: "id",
        },
      },
      cvId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "CV", // Đảm bảo rằng bảng CV đã được tạo
          key: "id",
        },
      },
      status: {
        type: Sequelize.ENUM("not_contacted", "contacted"),
        defaultValue: "not_contacted",
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
    await queryInterface.dropTable("Application");
  },
};
