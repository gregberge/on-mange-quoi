var mongoose = require('mongoose'),
db = {
  connecting: false,

  connected: false,

  connect: function () {
    if (db.connecting || db.connected) {
      return ;
    }

    db.connecting = true;

    mongoose.connect('localhost', 'test');

    mongoose.connection.on('close', function () {
      this.connected = false;
      db.connect();
    });

    mongoose.connection.on('error', function () {
      db.connected = false;
      db.connect();
    });

    mongoose.connection.on('connected', function () {
      db.connected = true;
    });
  }
};

exports.connect = db.connect;