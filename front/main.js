var config = {
  baseUrl: '/medias/',
  paths: {
    templates: 'templates',
    backbone: 'components/backbone/backbone',
    jquery: 'components/jquery/jquery',
    underscore: 'components/lodash/lodash.underscore',
    text: 'components/requirejs-text/text',
    hogan: 'components/hogan/web/builds/2.0.0/hogan-2.0.0.amd'
  },
  shim: {
    backbone: {
      deps: [
      'underscore',
      'jquery'
      ],
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    }
  }
};

if(typeof module !== 'undefined') {
  module.exports = config;
}
else {
  require.config(config);
  require(['app']);
}