const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../configue/db.js");

const userSchema = sequelize.define("User", {
    firstname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    mobilenumber: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [10, 10],
            isNumeric: true,
        },
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    createdDate: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        field: 'createdAt',
    },
    createdBy: {
        type: Sequelize.DataTypes.STRING, 
        defaultValue:"user",
    },
    updatedDate: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: Sequelize.DataTypes.DATE, 
        allowNull: false,
        field: 'updatedAt',
    },
});


sequelize.sync({alter:true}) 
    .then(() => {
        console.log('User table synced successfully!');
    })
    .catch((error) => {
        console.error('Unable to sync table: ', error);
    });

module.exports = userSchema;
