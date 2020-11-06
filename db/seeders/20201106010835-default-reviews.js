"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Reviews",
      [
        {
          review: "This book was so good",
          userId: 1,
          bookId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          review: "This book was so good I can't believe ",
          userId: 1,
          bookId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          review: "This book was so good I didn't read it",
          userId: 1,
          bookId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          review: "This book was so good I don't even know",
          userId: 1,
          bookId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          review: "This book was so good how could you not",
          userId: 1,
          bookId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          review:
            "This book was so good that I just copied this all and pasted it This book was so good that I just copied this all and pasted it This book was so good that I just copied this all and pasted it This book was so good that I just copied this all and pasted it This book was so good that I just copied this all and pasted it",
          userId: 1,
          bookId: 6,
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
      */
    return queryInterface.bulkDelete("Reviews", null, {});
  },
};
