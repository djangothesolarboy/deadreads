'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { username: 'demo', email: 'demo@demo.com', hashedPassword: '$2a$10$I7zcTnw18CJUwtxwDyu7IeYcNRuYg8NPEcE0Taz/na8aCJkZSq7zu', birthdate: new Date(), fullName: 'demo user', gender: 'Other', createdAt: new Date(), updatedAt: new Date() },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
