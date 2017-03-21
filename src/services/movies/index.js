'use strict';

const service = require('feathers-mongoose');
const movies = require('./movies-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: movies,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/movies', service(options));

  // Get our initialize service to that we can bind hooks
  const moviesService = app.service('/movies');

  // Set up our before hooks
  moviesService.before(hooks.before);

  // Set up our after hooks
  moviesService.after(hooks.after);
};
