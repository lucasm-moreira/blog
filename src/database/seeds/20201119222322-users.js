module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      email: 'lucas@email.com',
      password: '$2a$10$1wgi07Tc9k5F4ee7iOzk3OJsYiC5N0XmhSIOyaKLHAIuVYX5kGLdy',
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};