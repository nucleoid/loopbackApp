var uuid = require('node-uuid');

module.exports = function(Assignments) {

  Assignments.disableRemoteMethod("create", true);
  Assignments.disableRemoteMethod("upsert", true);
  Assignments.disableRemoteMethod("updateAll", true);
  Assignments.disableRemoteMethod("updateAttributes", false);
  Assignments.disableRemoteMethod("deleteById", true);
  Assignments.disableRemoteMethod("exists", true);

  Assignments.afterInitialize = function() {
    this.uuid = uuid.unparse(this.rawUuid);
  };
};
