var express = require('express'),
app = express(),
cons = require('consolidate'),
router = require('./router');

global.root = __dirname;

var APP_PORT;

app.configure(function() {
  app.engine('mustache', cons.hogan);
  app.set('view engine', 'mustache');
  app.set('views', __dirname + '/../templates');
  app.use('/medias', express.static(__dirname + '/../front'));
  app.use('/medias/templates', express.static(__dirname + '/../templates'));
  app.use('/medias/components', express.static(__dirname + '/../components'));
  app.use('/medias/font', express.static(__dirname + '/../components/font-awesome/font'));
  app.use('/medias/css', express.static(__dirname + '/../dist/css'));
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(app.router);
  APP_PORT = 80;
});

app.configure('development', function() {
  app.use('/medias/less', express.static(__dirname + '/../less'));
  APP_PORT = 3000;
});

router(app);
app.listen(APP_PORT);