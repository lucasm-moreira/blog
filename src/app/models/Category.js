import databaseConfig from '../../config/database';

const Sequelize = require('sequelize');

const connection = new Sequelize(databaseConfig);

const Category = connection.define('categories', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Category;
