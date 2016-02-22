var loopback = require('loopback');
var ds = loopback.createDataSource('mysql', {
    "host": "localhost",
    "port": 3306,
    "database": "platform_remix",
    "name": "platform-remix",
    "user": "root",
    "connector": "mysql"
});
  
// Discover and build models from INVENTORY table
ds.discoverSchema('marketers', {schema: 'platform_remix', relations: false},
  function (err, schema) {
    console.log(JSON.stringify(schema));
  });
