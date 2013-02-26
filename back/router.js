var router = function (app) {
  app.get('/', require('./routes/home').show);
  app.get('/m/:meetingHash', require('./routes/food-meeting').show);
  app.get('/m/:meetingHash/:email/:emailHash', require('./routes/food-meeting').show);

  /** API **/

  app.get('/api/foursquare-venue', require('./routes/api/foursquare-venue').findAll);

  app.get('/api/food-meeting', require('./routes/api/food-meeting').findAll);
  app.post('/api/food-meeting', require('./routes/api/food-meeting').add);
  app.put('/api/food-meeting/:id', require('./routes/api/food-meeting').update);

  app.get('/api/poll', require('./routes/api/poll').findAll);
  app.post('/api/poll', require('./routes/api/poll').add);
  app.put('/api/poll/:id', require('./routes/api/poll').update);
};

exports = module.exports = router;