"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "Reviews",
      [
        {
          review: "gsfdgsdfgsdfgsfgsfgsdfsfsfdggsdfgsdfgsdfgsfg",
          userId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          review:
            "gsfdgsdfgsdfgsfgsfgsdfsfsfdggsdfgsdfgsdfgsfgsdfgsdfgsfdgsdfgsdfgsdfgsdfgjneruigneiurgiuwebripubgweipubrpiuqpriuqpiubfiuqberwiubaeiufbviesubrpuiweruber",
          userId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          review: "yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeet",
          userId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Reviews", null, {});
  },
};
