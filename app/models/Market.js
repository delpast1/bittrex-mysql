'use strict'

module.exports = (sequelize, Sequelize) => {  
    const Market = sequelize.define('markets', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        market: {
            type: Sequelize.STRING,
            required: true
        },
        low: {
            type: Sequelize.DOUBLE,
            required: true
        },
        high1: {
            type: Sequelize.DOUBLE,
            required: true
        },
        high2: {
            type: Sequelize.DOUBLE,
            required: true
        },
        high3: {
            type: Sequelize.DOUBLE,
            required: true
        },
        date_low: {
            type: Sequelize.DATE,
            required: true
        },
        status: {
            type: Sequelize.INTEGER,
            required: true
        }
    }, {
        underscored: true
      });
      // create table
    //   Market.sync({force: true});
      return Market;
}