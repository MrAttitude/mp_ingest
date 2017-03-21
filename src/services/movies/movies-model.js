'use strict';

// movies-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
  adult: {
    type: Boolean,
    allowNull: true
  },
  backdrop_path: {
    type: String,
    allowNull: true
  },
  belongs_to_collection: {
    type: String,
    allowNull: true
  },
  budget: {
    type: Number,
    allowNull: true
  },
  genres: {
    type: String,
    allowNull: true
  },
  homepage: {
    type: String,
    allowNull: true
  },
  id: {
    type: Number,
    primaryKey: true,
    allowNull: false
  },
  imdb_id: {
    type: String,
    allowNull: true
  },
  original_language: {
    type: String,
    allowNull: true
  },
  original_title: {
    type: String,
    allowNull: true
  },
  overview: {
    type: String,
    allowNull: false
  },
  popularity: {
    type: String,
    allowNull: true
  },
  poster_path: {
    type: String,
    allowNull: true
  },
  production_companies: {
    type: String,
    allowNull: true
  },
  production_countries: {
    type: String,
    allowNull: true
  },
  release_date: {
    type: Date,
    allowNull: true
  },
  revenue: {
    type: Number,
    allowNull: true
  },
  runtime: {
    type: Number,
    allowNull: true
  },
  spoken_languages: {
    type: String,
    allowNull: true
  },
  status: {
    type: String,
    allowNull: true
  },
  tagline: {
    type: String,
    allowNull: true
  },
  title: {
    type: String,
    allowNull: false
  },
  video: {
    type: Boolean,
    allowNull: true
  },
  vote_average: {
    type: Number,
    allowNull: true
  },
  vote_count: {
    type: Number,
    allowNull: true
  }
});

const moviesModel = mongoose.model('movies', moviesSchema);

module.exports = moviesModel;