var request = require('supertest'),
  app = require(base + '/server/app'),
  mongoose = require('mongoose'),
  FoodMeeting = require(base + '/server/models/food-meeting');

describe('Food meetings API', function () {

  beforeEach(function (done) {
    FoodMeeting.remove({}, done);
  });


  describe('GET /api/food-meetings', function () {

    beforeEach(function (done) {
      FoodMeeting.create([{venues: 'foo'}, {}], done);
    });

    it('should list all food-meetings', function (done) {
      request(app)
        .get('/api/food-meetings')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);

          expect(res.body, 'body').to.have.length(2);
          expect(res.body[0]).to.have.property('venues', 'foo');
          done();
        });
    });

  });


  describe('POST /api/food-meetings', function () {

    it('should create a new food meeting', function (done) {
      request(app)
        .post('/api/food-meetings')
        .send({
          venues: 'foo'
        })
        .expect(201)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body).to.have.property('venues', 'foo');
          done();
        });
    });

  });


  describe('GET /api/food-meetings/:id', function () {

    var id;

    beforeEach(function (done) {
      FoodMeeting.create({venues: 'foo'}, function (err, foodMeeting) {
        id = foodMeeting._id;
        done(err);
      });
    });

    it('should get one food meeting', function (done) {
      request(app)
        .get('/api/food-meetings/' + id)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);

          expect(res.body).to.have.property('venues', 'foo');
          done();
        });
    });

  });


  describe('PATCH /api/food-meetings/:id', function () {

    var id;

    beforeEach(function (done) {
      FoodMeeting.create({venues: 'foo'}, function (err, foodMeeting) {
        id = foodMeeting._id;
        done(err);
      });
    });

    it('should update food meeting', function (done) {
      request(app)
        .patch('/api/food-meetings/' + id)
        .send({venues: 'bar'})
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);

          expect(res.body).to.have.property('venues', 'bar');
          done();
        });
    });
  });

  after(function (done) {
    FoodMeeting.remove({}, done);
  });

});