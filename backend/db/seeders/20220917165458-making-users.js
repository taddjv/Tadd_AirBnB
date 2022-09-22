"use strict";
const { User } = require("../models");
const bcrypt = require("bcryptjs");

const users = [
  {
    firstName: "The",
    lastName: "Joker",
    email: "eviljoker@gmail.com",
    username: "Joker.is.bad",
    password: "killbatman",
  },
  {
    firstName: "Ra's",
    lastName: "Al Ghul",
    email: "rasalghul@gmail.com",
    username: "Ghulzz",
    password: "ilikeswords",
  },
  {
    firstName: "Two",
    lastName: "Face",
    email: "twoface@gmail.com",
    username: "twoFaces2",
    password: "igotburned",
  },
  {
    firstName: "Harley",
    lastName: "Quinn",
    email: "harleyyy@gmail.com",
    username: "quinnHarleyy",
    password: "ilovejoker",
  },
  {
    firstName: "The",
    lastName: "Riddler",
    email: "riddlessss@gmail.com",
    username: "i.like.riddles",
    password: "aSimpleRiddle",
  },
  {
    firstName: "Great",
    lastName: "Bane",
    email: "banekills@gmail.com",
    username: "i_have_muscles",
    password: "i.wear.mask",
  },
  {
    firstName: "Talia",
    lastName: "Al Ghul",
    email: "taliagurl@gmail.com",
    username: "i_killz",
    password: "i_Have_a_dad",
  },
  {
    firstName: "Hugo",
    lastName: "Strange",
    email: "drStrange@gmail.com",
    username: "imADocc",
    password: "letsDoSurgery",
  },
  {
    firstName: "Jonathan",
    lastName: "Crane",
    email: "boooo@gmail.com",
    username: "Scarecrow",
    password: "arentYouScared",
  },
  {
    firstName: "Victor",
    lastName: "Fries",
    email: "imOriginal@gmail.com",
    username: "Mr.Freeze",
    password: "below0degrees",
  },
  {
    firstName: "Slade",
    lastName: "Wilson",
    email: "death@gmail.com",
    username: "Deathstroke",
    password: "twoColorMask",
  },
  {
    firstName: "Oswald",
    lastName: "Cobblepot",
    email: "iWalkWeird@gmail.com",
    username: "Penguin",
    password: "iHateEveryone",
  },
  {
    firstName: "Pamela",
    lastName: "Isley",
    email: "plants@gmail.com",
    username: "PoisonIvy",
    password: "greenLife",
  },
  //!
  {
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@gmail.com",
    username: "johnnysmith",
    password: "secret password",
  },
  //!
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

    for (let i = 0; i < users.length; i++) {
      const { firstName, lastName, username, email, password } = users[i];
      const hashedPassword = bcrypt.hashSync(password);
      await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword,
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
  },
};
