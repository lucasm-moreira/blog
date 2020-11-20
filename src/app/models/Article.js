const Sequelize = require("sequelize");
import databaseConfig from '../../config/database';
import Category from '../models/Category';

const connection = new Sequelize(databaseConfig);

const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

Category.hasMany(Article); // UMA Categoria tem muitos artigos
Article.belongsTo(Category); // UM Artigo pertence a uma categoria

export default Article;