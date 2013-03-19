var ROUTE_DIR = global.base + '/app/routes',
routes = function (app) {
  app.get('/', require(ROUTE_DIR + '/home').show);
  app.get('/food-meeting/:id', require(ROUTE_DIR + '/food-meeting').show);
  app.get('/m/:meetingHash/:email/:emailHash', require(ROUTE_DIR + '/food-meeting').show);

  /** API **/

  app.get('/api/venue', require(ROUTE_DIR + '/api/venue').findAll);

  app.get('/api/food-meeting', require(ROUTE_DIR + '/api/food-meeting').findAll);
  app.post('/api/food-meeting', require(ROUTE_DIR + '/api/food-meeting').add);
  app.get('/api/food-meeting/:id', require(ROUTE_DIR + '/api/food-meeting').find);
  app.put('/api/food-meeting/:id', require(ROUTE_DIR + '/api/food-meeting').update);

  app.get('/api/poll', require(ROUTE_DIR + '/api/poll').findAll);
  app.post('/api/poll', require(ROUTE_DIR + '/api/poll').add);
  app.put('/api/poll/:id', require(ROUTE_DIR + '/api/poll').update);
};

exports = module.exports = routes;