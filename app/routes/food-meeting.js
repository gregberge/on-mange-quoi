module.exports = exports = {
  show: function (req, res) {
    res.redirect('/#' + req.url);
  }
};