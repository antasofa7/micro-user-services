/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        profession: 'Admin',
        role: 'ADMIN',
        email: 'admin@gmail.com',
        password: await bcrypt.hash('rahasia', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'John Doe',
        profession: 'Student',
        role: 'STUDENT',
        email: 'student@gmail.com',
        password: await bcrypt.hash('rahasia', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
