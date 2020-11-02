'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex(
      'User',
      ['username', 'email'],
      {
        indexName: 'UsersIndex',
        indicesType: 'UNIQUE'
    });
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      hashedPassword: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bookcryptsId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Crypts' }
      },
      birthdate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      fullName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Users');
  }
};