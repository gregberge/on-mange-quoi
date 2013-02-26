var Poll = require(global.root + '/models/poll'),
route = {

  findAll: function (req, res) {
    var now;

    if (req.query.current) {

      now = new Date();

      if (now.getHours() > 12) {
        res.send([]);
        return ;
      }
      else {
        req.query.created = {
          $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
          $lt: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12)
        };

        delete req.query.current;
      }
    }

    Poll.find(req.query).exec(function (err, polls) {
      res.send(polls);
    });
  },

  add: function (req, res) {
    var poll = new Poll(req.body);
    poll.save(function (err) {
      if (err) {
        return res.send({error: true});
      }

      return res.send(poll);
    });
  },

  update: function (req, res) {
    var data = req.body;
    delete data._id;

    Poll.findByIdAndUpdate(req.params.id, data, function (err, poll) {
      if (err) {
        return res.send({error: true});
      }

      return res.send(poll);
    });
  }
};

exports = module.exports = route;