"use strict";
const { Booking } = require("../models");
const bookings = [
  {
    spotId: 1,
    userId: 7,
    startDate: "2021-09-17",
    endDate: "2021-09-18",
  },
  {
    spotId: 2,
    userId: 8,
    startDate: "2021-09-12",
    endDate: "2021-10-30",
  },
  {
    spotId: 3,
    userId: 9,
    startDate: "2021-09-14",
    endDate: "2021-11-12",
  },
  {
    spotId: 4,
    userId: 10,
    startDate: "2021-09-11",
    endDate: "2021-09-14",
  },
  {
    spotId: 5,
    userId: 11,
    startDate: "2021-09-18",
    endDate: "2021-09-23",
  },
  {
    spotId: 6,
    userId: 12,
    startDate: "2021-09-22",
    endDate: "2021-09-28",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    for (let i = 0; i < bookings.length; i++) {
      const { spotId, userId, startDate, endDate } = bookings[i];

      await Booking.create({
        spotId,
        userId,
        startDate,
        endDate,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    for (let i = 0; i < bookings.length; i++) {
      const { spotId, userId, startDate, endDate } = bookings[i];

      await Booking.destroy({
        where: {
          spotId,
          userId,
          startDate,
          endDate,
        },
      });
    }
  },
};
