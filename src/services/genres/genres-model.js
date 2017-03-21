'use strict';

// genres-model.js - A sequelize model
// 
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const genres = sequelize.define('genres', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey : true,
      allowNull: false
    },
    name: {
      type : Sequelize.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });

  genres.sync();

  return genres;
};
