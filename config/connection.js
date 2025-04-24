const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
    // For Heroku 
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, 
            },
        },
    });
} else {
    // Local development 
    sequelize = new Sequelize(
        process.env.DBNAME,
        process.env.DBUSER,
        process.env.DBPASS,
        {
            host: 'localhost',
            dialect: 'postgres',
            port: 5432,
        }
    );
}

module.exports = sequelize;
