var src = 'src';
var dest = 'dist';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      main: {
        src: [
          src + '/js/lib/jquery.js',
          src + '/js/lib/handlebars.runtime.js',
          src + '/tmp/templates.js',
          src + '/js/app/**/*.js'
        ],
        dest: dest + '/js/main.js'
      }
    },

    jshint: {
      gruntfile: ['Gruntfile.js'],
      main: [
        src + '/js/app/**/*.js'
      ]
    },

    less: {
      main: {
        options: {
          compress: true
        },
        files: {
          'dist/css/main.css': src + '/less/main.less'
        }
      }
    },

    handlebars: {
      compile: {
        options: {
          processName: function(filename) {
            return filename.replace(/^src\/templates\//, '').replace(/\.handlebars$/, '');
          },
          namespace: "PP.TEMPLATE"
        },
        files: {
          'src/tmp/templates.js': [ src + '/templates/**/*.handlebars' ]
        }
      }
    },

    qunit: {
      model: [ src + '/tests/model_test.html' ]
    },

    uglify: {
      js: {
        files: {
          'dist/js/main.js': [ 'dist/js/main.js' ]
        }
      }
    },

    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: [ 'jshint:gruntfile' ]
      },
      main: {
        files: [
          src + '/js/app/controller.js',
          src + '/js/app/view.js'
       ],
        tasks: [ 'jshint:main', 'concat:main', 'uglify:js' ]
      },
      model: {
        files: [ src + '/js/app/model.js' ],
        tasks: [ 'jshint:main', 'qunit:model', 'concat:main', 'uglify:js' ]
      },
      less: {
        files: [
          src + '/less/*.less'
        ],
        tasks: [ 'less' ]
      },
      qunit: {
        files: [
          src + '/tests/*.html',
          src + '/tests/*.js'
        ],
        tasks: [ 'qunit' ]
      },
      templates: {
        files: [
          src + '/templates/**/*.handlebars'
        ],
        tasks: [ 'handlebars', 'concat:main' ]
      }
    }

  });

  // Load modules.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'handlebars', 'concat', 'uglify', 'less', 'watch']);

};
