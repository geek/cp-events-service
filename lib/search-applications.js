'use strict';
var async = require('async');
var _     = require('lodash');

function searchApplications(args, callback) {
  var seneca = this;
  async.waterfall([
    function(done) {
      seneca.act('role:cd-events-elasticsearch,cmd:search', {search:args.search, type:'cd_applications'}, done);
    },
    function(searchResult, done) {
      return done(null, {
        total: searchResult.total,
        records: _.pluck(searchResult.hits, '_source')
      });
    }
  ], function(err, res) {
    if (err) return done(err);
    return callback(null, res);
  });
}

module.exports = searchApplications;