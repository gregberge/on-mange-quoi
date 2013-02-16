var route = {
  findAll: function (req, res) {
    var foursquare = (require('foursquarevenues'))('W2KH5DEAVKXM1BIDOHUDUOPX4M4X22Y33XGSR3HNGL23BR0J', '34HP4QTQJ5PT2EVOVQ0MSX5NBA52ISQVJ3GJGXMZSOALHKUA');

    // restrict to food section
    req.query.section = 'food';

    foursquare.exploreVenues(req.query, function (error, venues) {
        if (error) {
            res.send({error: true});
        }
        else {
          res.send(venues.response.groups[0].items);
        }
    });
  }
};

exports = module.exports = route;