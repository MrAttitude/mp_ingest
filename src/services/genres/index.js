'use strict';

const service = require('feathers-sequelize');
const genres = require('./genres-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: genres(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/genres', service(options));

  // Get our initialize service to that we can bind hooks
  const genresService = app.service('/genres');

  // Set up our before hooks
  genresService.before(hooks.before);

  // Set up our after hooks
  genresService.after(hooks.after);
};
