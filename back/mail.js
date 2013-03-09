var mandrillMail = require('mandrill-send')('GZoGtCqu9ER5ogoPCVsQFw'),
fs = require('fs'),
hogan = require('hogan.js'),
templatePath = __dirname + '/../templates/emails',
templates = [],

resolveTemplatePath =  function (name) {
  return templatePath + '/' + name + '.mustache';
},

getTemplate = function (name, callback) {
  // template in cache ?
  if (typeof templates[name] !== 'undefined') {
    return callback(templates[name]);
  }

  // read template from file
  fs.readFile(resolveTemplatePath(name), function (err, data) {
    if (err) {
      return console.log(err);
    }

    // cache template
    templates[name] = hogan.compile(data + '');

    return callback(templates[name]);
  });
},

mail = function (templateName, data, options, callback) {
  getTemplate(templateName, function (template) {
    options.html = template.render(data);
    mandrillMail(options, callback);
  });
};

module.exports = exports = mail;