'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CryptJoinBooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cryptId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Crypts" }
      },
      bookId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Books" },
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CryptJoinBooks');
  }
};
