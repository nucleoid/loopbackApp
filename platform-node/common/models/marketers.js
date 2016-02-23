var uuid = require('node-uuid');

module.exports = function(Marketers) {
  Marketers.disableRemoteMethod("create", true);
  Marketers.disableRemoteMethod("upsert", true);
  Marketers.disableRemoteMethod("updateAll", true);
  Marketers.disableRemoteMethod("updateAttributes", false);
  Marketers.disableRemoteMethod("deleteById", true);
  Marketers.disableRemoteMethod("exists", true);

  Marketers.afterInitialize = function() {
    this.uuid = uuid.unparse(this.rawUuid);
  };
};
