var util = require('util');
var uuid = require('node-uuid');

module.exports = function(Programs) {

  Programs.afterInitialize = function() {
    this.uuid = uuid.unparse(this.rawUuid);
  };

  Programs.report = function(id, cb) {
    Programs.findById(id, function(err, prog) {
      if (err) return cb(err, null);
      if (!prog) return cb(new Error('No program with that id was found.'), null);
      prog.customer(function(err, cust) {
        if (err) return cb(err, null);
        if (!cust) return cb(new Error('No Customer found for program with that id was found.'), null);
        Programs.app.models.Assignments.count({programId: id}, function(err, count) {
          if (err) return cb(err, null);
          cb(null, {
            name: prog.programName,
            brand_logo: util.format("https://platform-remix-staging.s3.amazonaws.com/uploads/%s/%s", prog.uuid, prog.brandLogo),  //TODO figure out environments
            assignments: count,
            customer: {name: cust.name, email: cust.email}});
        });
      });
    });
  };

  Programs.remoteMethod('report', {
    description: 'Generates a report of a program',
    accepts: {arg: 'id', type: 'Number', description: 'Integer identifier for a program', required: true},
    returns: {arg: 'report', type: 'String'},
    http: {path: '/report', verb: 'get', status: 200, errorStatus: 400},
    isStatic: true
  });
};
