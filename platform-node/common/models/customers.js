var uuid = require('node-uuid');

module.exports = function(Customers) {
  Customers.disableRemoteMethod("create", true);
  Customers.disableRemoteMethod("upsert", true);
  Customers.disableRemoteMethod("updateAll", true);
  Customers.disableRemoteMethod("updateAttributes", false);
  Customers.disableRemoteMethod("deleteById", true);
  Customers.disableRemoteMethod("exists", true);

  Customers.afterInitialize = function() {
    this.uuid = uuid.unparse(this.rawUuid);
  };
};
