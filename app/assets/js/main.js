require.config({
  baseUrl: '/assets/js',
  paths: {
    'tpl'         : '../tpl',
    'bootstrap'   : '../components/bootstrap/js',

    'backbone'    : '../components/backbone/backbone',
    'jquery'      : '../components/jquery/jquery',
    'lodash'      : '../components/lodash/dist/lodash.underscore',
    'text'        : '../components/requirejs-text/text',
    'hogan'       : '../components/hogan/web/builds/2.0.0/hogan-2.0.0.amd'
  },
  shim: {
    'backbone': {
      deps: [
        'lodash',
        'jquery'
      ],
      exports: 'Backbone'
    },
    'hogan': {
      exports: 'Hogan'
    },
    'lodash': {
      exports: '_'
    },
    'bootstrap/bootstrap-transition': {
      deps: [
        'jquery'
      ]
    },
    'bootstrap/bootstrap-collapse': {
      deps: [
        'jquery'
      ]
    },
    'bootstrap/bootstrap-dropdown': {
      deps: [
        'jquery',
        'bootstrap/bootstrap-transition',
        'bootstrap/bootstrap-collapse'
      ]
    },
    'app': {
      deps: [
        'backbone',
        'hogan',
        'bootstrap/bootstrap-dropdown'
      ]
    }
  },
  deps: [
    'app'
  ]
});