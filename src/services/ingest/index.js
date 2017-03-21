'use strict';

const hooks = require('./hooks');
const axios = require('axios');
var await = require('asyncawait/await');
var async = require('asyncawait/async');
var qs = require("query-string");
var Kafka = require('no-kafka');
var producer = new Kafka.Producer({
  connectionString: '192.168.110.198:9092'
});
class Service {
  constructor(options) {
    this.options = options || {};
    this.baseURL = options.get('tmdbBaseURL');
    this.apiKey = options.get("tmdbAPIKey");
  }

  find(params) {
    var that = this;
    var aInstance = axios.create({
      baseURL: this.baseURL
    });
    var originalQS = params.query;
    console.log(originalQS);
    originalQS['api_key'] = this.apiKey;
    var baseQuery = originalQS.query;

    delete originalQS.query;
    // queryString
    var queryString = baseQuery + "&" + qs.stringify(originalQS);

    var getWithPaging = async(function () {
      var doneGetAllPages = false;
      while (!doneGetAllPages) {
        let resultData = await(that.fetchApi(aInstance, queryString));
        that.transformDiscoverResult(that.options, resultData.results);
        if (resultData.page < resultData.total_pages) {
          if (originalQS.page) {
            originalQS.page = (resultData.page + 1);
          } else {
            originalQS['page'] = (resultData.page + 1);
          }
          // update queryString with new page
          queryString = baseQuery + "&" + qs.stringify(originalQS);
        } else {
          doneGetAllPages = true;
        }
      }
      return true;
    });

    getWithPaging().then(function (result) {
      return Promise.resolve(result);
    });
  }

  sendToKafka(movie) {
    return producer.init().then(function () {
      return producer.send({
        topic: 'ingest_movies',
        partition: 0,
        message: {
          value: JSON.stringify(movie)
        }
      });
    }).then(function (result) {
      console.log(result);
      //[{ topic: 'kafka-test-topic', partition: 0, offset: 353 }]
    });
  }



  fetchApi(axiosInstance, url) {
    console.log(url);
    return axiosInstance.get(url)
      .then(function (response) {
        //console.log(response.data);
        return Promise.resolve(response.data);
      })
      .catch(function (err) {
        console.log(err);
      })
  }

  transformDiscoverResult(app, movieJsons) {
    //console.log(movieJsons);
    const movieService = app.service('/movies');
    var self = this;
    movieJsons.forEach(function (movie) {
      movieService.create(movie);
      //self.sendToKafka(movie);
    }, self);
  }
}

module.exports = function () {
  const app = this;

  // Initialize our service with any options it requires
  app.use('/ingests', new Service(app));

  // Get our initialize service to that we can bind hooks
  const ingestService = app.service('/ingests');

  // Set up our before hooks
  ingestService.before(hooks.before);

  // Set up our after hooks
  ingestService.after(hooks.after);
};

module.exports.Service = Service;
