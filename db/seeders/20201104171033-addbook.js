'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [
      {author: 'Stephen King', title: 'The Stand', publisher: 'Doubleday', publicationDate: new Date('October 3, 1978 00:00:00'), tagId: null, coverArt: null, createdAt: new Date(), updatedAt: new Date()}
    ], {});

  },

  down: (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('Books', null, {});
  }
};
