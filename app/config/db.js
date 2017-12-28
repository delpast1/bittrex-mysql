'use strict';

const Sequelize = require('sequelize');

const sequelize = new Sequelize('bittrex', 'root', 'ditimthatbai1', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 2,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        underscored: true
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.markets = require('../models/Market')(sequelize, Sequelize);

// Association
// db.details.belongsTo(db.debtors);
// db.debtors.hasMany(db.details);

// sequelize
// .authenticate()
// .then(() => {
//   console.log('Connection has been established successfully.');
// })
// .catch(err => {
//   console.error('Unable to connect to the database:', err);
// });

exports = module.exports = db;