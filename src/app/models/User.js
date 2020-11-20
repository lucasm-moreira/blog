import Sequelize from 'sequelize';
import databaseConfig from '../../config/database';

const connection = new Sequelize(databaseConfig);

const User = connection.define('users', {
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default User;
