var debug = require('debug')('platform:roleResolver');
var loopback = require('loopback');

module.exports = function(app) {
  var Role = app.models.Role;

  Role.registerResolver('marketersCustomer', function(role, context, cb) {
    function reject() {
      process.nextTick(function() {
        cb(null, false);
      });
    }

    var userId = context.accessToken.userId;
    if (!userId) {
      debug('No user authenticated');
      return reject();
    }

    var currentUser = loopback.getCurrentContext().get('currentUser');
    if (!currentUser) {
      debug('No user found in context');
      return reject();
    }

    context.model.findById(context.modelId, function(err, model) {
      if (err || !model || !model.customer_id){
        debug('Failed to retrieve model');
        return reject();
      }

      var pass = currentUser.customer_id === model.customer_id;
      debug("%s access to %s:%s for user %d", pass? 'Approving': 'Denying', context.modelName, context.modelId, userId);
      cb(null, pass);
    });
  });
};
