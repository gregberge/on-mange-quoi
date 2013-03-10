module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'front/**/*.js', 'back/**/*.js', '!front/build.js']
    },

    less: {
      all: {
        options: {
          compress: true
        },
        files: {
          'dist/css/main.css': ['less/main.less']
        }
      }
    },

    requirejs: {
      all: {
        options: {
          mainConfigFile: 'front/main.js',
          baseUrl: 'front',
          name: 'main',
          out: 'dist/js/main.js',
          paths: {
            backbone: '../components/backbone/backbone',
            jquery: '../components/jquery/jquery',
            underscore: '../components/lodash/dist/lodash.underscore',
            text: '../components/requirejs-text/text',
            hogan: '../components/hogan/web/builds/2.0.0/hogan-2.0.0.amd',
            bootstrap: '../components/bootstrap/js'
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', ['jshint', 'less']);
};