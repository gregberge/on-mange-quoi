var express = require('express'),
app = express(),
cons = require('consolidate'),
router = require('./router');

var APP_PORT = 80;

app.configure(function() {
  app.engine('mustache', cons.hogan);
  app.set('view engine', 'mustache');
  app.set('views', __dirname + '/templates');
  app.use('/medias', express.static(__dirname + '/front'));
  app.use('/medias/templates', express.static(__dirname + '/templates'));
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(app.router);
});

app.configure('development', function() {
  app.use('/medias/less', express.static(__dirname + '/less'));
  app.use('/medias/components', express.static(__dirname + '/components'));
  APP_PORT = 3000;
});

router(app);
app.listen(APP_PORT);