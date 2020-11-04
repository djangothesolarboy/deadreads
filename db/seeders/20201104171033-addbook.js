'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [
      {author: 'Stephen King', title: 'The Stand', publisher: 'Doubleday', publicationDate: new Date('October 3, 1978'), synopsis: 'Good vs Evil in the post-apocalypse', tagId: null, coverArt: null, createdAt: new Date(), updatedAt: new Date()}
    ], {});

  },

  down: (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('Books', null, {});
  }
};
