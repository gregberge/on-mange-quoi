module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'app/**/*.js']
    },

    less: {
      all: {
        options: {
          paths: ['app/assets/less', 'public'],
          compress: true
        },
        files: {
          'public/assets/css/main.css': ['app/assets/less/main.less']
        }
      }
    },

    requirejs: {
      all: {
        options: {
          mainConfigFile: 'app/assets/js/main.js',
          baseUrl: 'app/assets/js',
          paths: {
            'bootstrap'   : '../../../components/bootstrap/js',
            'backbone'    : '../../../components/backbone/backbone',
            'jquery'      : '../../../components/jquery/jquery',
            'lodash'      : '../../../components/lodash/dist/lodash.underscore',
            'text'        : '../../../components/requirejs-text/text',
            'handlebars'  : '../../../components/handlebars/handlebars'
          },
          name: 'app',
          out: 'public/assets/js/main.js',
        }
      }
    },

    copy: {
      all: {
        files: [
          {src: 'app/assets/tpl/**', dest: 'public/assets/tpl/'},
          {src: 'app/assets/img/**', dest: 'public/assets/img/'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['jshint', 'less', 'requirejs', 'copy']);
};