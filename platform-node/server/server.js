var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();
var port = 3001;

app.use(loopback.context());
app.use(loopback.token());

app.use(function setCurrentUser(req, res, next) {
  if (!req.accessToken)
    return next();
  app.models.Marketers.findById(req.accessToken.userId, function(err, user) {
    if (err)
      return next(err);
    if (!user)
      return next(new Error('No user with this access token was found.'));
    var loopbackContext = loopback.getCurrentContext();
    if (loopbackContext)
      loopbackContext.set('currentUser', user);
    next();
  });
});

app.start = function() {
  // start the web server
  app.listen(port);
  console.log('Web server listening at: Web server listening at: http://localhost:%d', port);
  if (app.get('loopback-component-explorer')) {
    var explorerPath = app.get('loopback-component-explorer').mountPath;
    console.log('Browse your REST API at http://localhost:%d%s', port, explorerPath);
  }
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
