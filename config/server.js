var express = require('express'),
app = require('./application');

app.configure(function() {

  // express config
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(app.router);

  // view config
  app.engine('mustache', require('consolidate').hogan);
  app.set('view engine', 'mustache');
  app.set('views', global.base + '/app/templates');

  // routes
  require('./routes')(app);

  // aliases
  app.use(express.static(global.base + '/public'));
  app.use('/assets/components', express.static(global.base + '/components'));
  app.use('/assets/font', express.static(global.base + '/components/font-awesome/font'));
});

app.configure('development', function () {
  app.use('/assets', express.static(global.base + '/app/assets'));
});

module.exports = exports = app;