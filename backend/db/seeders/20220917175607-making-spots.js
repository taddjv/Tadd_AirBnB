"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
const { Spot } = require("../models");
const spots = [
  {
    address: "1 AT&T Way",
    city: "Arlington",
    state: "Texas",
    country: "United States",
    lat: 32.7469,
    lng: -97.0924,
    name: "AT&T Stadium",
    description:
      "AT&T Stadium, formerly Cowboys Stadium, is a retractable roof stadium in Arlington, Texas, United States.",
    price: 14,
    owner: 1,
    avgRating: 3.3,
    previewImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Arlington_June_2020_4_%28AT%26T_Stadium%29.jpg/1920px-Arlington_June_2020_4_%28AT%26T_Stadium%29.jpg",
  },
  {
    address: "54 Peachtree St NW",
    city: "Atlanta",
    state: "Georgia",
    country: "United States",
    lat: 33.7553,
    lng: -84.389,
    name: "Mercedes Benz stadium Atlanta",
    description:
      "Mercedes-Benz Stadium is a multi-purpose stadium located in Atlanta, Georgia, United States",
    price: 75,
    owner: 2,
    avgRating: 4.3,
    previewImage:
      "https://cdn.vox-cdn.com/thumbor/DX9jYPrPhKCiodsp656Q_94uA9E=/0x0:2740x1824/920x613/filters:focal(1151x693:1589x1131):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/56280377/999476412.jpg.1504558796.jpg",
  },
  {
    address: "1500 Sugar Bowl Dr",
    city: "New Orleans",
    state: "Louisiana",
    country: "United States",
    lat: 29.9523,
    lng: -90.0806,
    name: "Caesars Superdome",
    description:
      "The Caesars Superdome is a multi-purpose stadium located in the Central Business District of New Orleans, Louisiana.",
    price: 33,
    owner: 3,
    avgRating: 2.2,
    previewImage:
      "https://upload.wikimedia.org/wikipedia/commons/a/ab/Louisiana_Superdome_-_Unbranded_-_26_July_2021.jpg",
  },
  {
    address: "500 S Capitol Ave",
    city: "Indianapolis",
    state: "Indiana",
    country: "United States",
    lat: 39.7597,
    lng: -86.1635,
    name: "Lucas Oil Stadium",
    description:
      "Lucas Oil Stadium is a multi-purpose stadium in downtown Indianapolis, Indiana, United States.",
    price: 52,
    owner: 4,
    avgRating: 3.6,
    previewImage:
      "https://upload.wikimedia.org/wikipedia/commons/2/2b/Indianapolis-1872530.jpg",
  },
  {
    address: "1 MetLife Stadium Dr",
    city: "East Rutherford",
    state: "New Jersey",
    country: "United States",
    lat: 40.8137,
    lng: -74.073,
    name: "MetLife Stadium",
    description:
      "MetLife Stadium is a multi-purpose stadium at the Meadowlands Sports Complex in East Rutherford, New Jersey, 5 mi west of New York City. ",
    price: "106",
    owner: 4,
    avgRating: 3.9,
    previewImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Metlife_stadium_%28Aerial_view%29.jpg/250px-Metlife_stadium_%28Aerial_view%29.jpg",
  },
  {
    address: "1909 Av. des Canadiens-de-Montréal",
    city: "Montreal",
    state: "Quebec",
    country: "Montreal",
    lat: 45.4961,
    lng: 73.5693,
    name: "Bell Center",
    description:
      "Bell Centre, formerly known as Molson Centre, is a multi-purpose arena located in Montreal, Quebec, Canada.",
    price: 999,
    owner: 5,
    avgRating: 4.0,
    previewImage:
      "https://upload.wikimedia.org/wikipedia/commons/8/80/CentreBell.jpg",
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
    for (let i = 0; i < spots.length; i++) {
      const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        owner,
        avgRating,
        previewImage,
      } = spots[i];
      await Spot.create({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        ownerId: owner,
        avgRating,
        previewImage,
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
    for (let i = 0; i < spots.length; i++) {
      const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        owner,
        avgRating,
        previewImage,
      } = spots[i];
      await Spot.destroy({
        where: {
          address,
          city,
          state,
          country,
          lat,
          lng,
          name,
          description,
          price,
          ownerId: owner,
          avgRating,
          previewImage,
        },
      });
    }
  },
};
