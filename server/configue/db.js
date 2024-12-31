const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();



const sequelize = new Sequelize(
    process.env.DB_DATABASE,

    process.env.DB_USERNAME,

    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: console.log
    }
);

// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
// }).catch((error) => {
//     console.error('Unable to connect to the database: ', error);
// });



module.exports = sequelize;