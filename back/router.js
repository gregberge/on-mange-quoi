var router = function (app) {
  app.get('/', require('./routes/home').show);
  app.get('/m/:hash', require('./routes/food-meeting').show);
  app.get('/api/foursquare-venue', require('./routes/api/foursquare-venue').findAll);
  app.get('/api/food-meeting', require('./routes/api/food-meeting').findAll);
  app.post('/api/food-meeting', require('./routes/api/food-meeting').add);
  app.put('/api/food-meeting/:id', require('./routes/api/food-meeting').update);
};

exports = module.exports = router;