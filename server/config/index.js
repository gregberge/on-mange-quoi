var nconf = require('nconf');

module.exports = nconf
  .env()
  .file(__dirname + '/config.json')
  .file('env', __dirname + '/config.' + nconf.get('NODE_ENV')  + '.json')
  .file('user', __dirname + '/config.' + nconf.get('NODE_ENV')  + '.' + nconf.get('USER') + '.json');