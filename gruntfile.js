// Gruntfile.js
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: "scss/**/*.scss",
        tasks: ["build"]
      },
      jshint: {
        files: "js/*.js",
        tasks: ["jshint"]
      },
      jekyll: {
        files: ["docs/**/*.*", "scss/**/*.scss"],
        tasks: ["docs-build"]
      }
    },
    sass: {
      options: {
        outputStyle: "expanded",
        sourceMap: true,
        indentedSyntax: true
      },
      dev: {
        files: {
          "dist/wfpui.css" : "scss/wfpui.scss",
          "dist/bootstrap-theme.css" : "scss/bootstrap-theme.scss"
        }
      },
      dist: {
        options: {
          sourceMap: false
        },
        files: {
          "dist/wfpui.css" : "scss/wfpui.scss",
          "dist/bootstrap-theme.css" : "scss/bootstrap-theme.scss"
        }
      },
      docs: {
        files: {
          "docs/css/main.css": "docs/_sass/main.scss"
        }
      }
    },
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({ browsers: ['last 2 version'] }),
          require('cssnano')()
        ],
        map: {
          inline: false,
        }
      },
      dist: {
        options: {
          map: false
        },
        src: 'dist/*.css'
      },
      dev: {
        src: 'dist/*.css'
      },
      docs: {
        src: 'docs/css/*.css'
      }
    },
    jekyll: {
      dev: {
        options: {
          src: "./docs",
          config: './docs/_config-dev.yml',
          dest: "./dist/docs"
        }
      },
      dist: {
        options: {
          src: "./docs",
          config: './docs/_config.yml',
          dest: "./dist/docs"
        }
      }
    },
    jshint: {
      options: {
        globals: {
          jQuery: true
        },
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        multistr: true
      },
      all: ['js/*.js', 'test/*.js']
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks("grunt-sass");

  // Build WFP UI Docs
  grunt.registerTask("docs-build", ["sass:docs", "postcss:docs", "jekyll:dev"]);
  grunt.registerTask("docs-dist", ["sass:docs", "postcss:docs", "jekyll:dist"]);
  // Build WFP UI
  grunt.registerTask("build", ["jshint", "sass:dev", "postcss:dev"]);
  // Build a dist-ready WFP UI
  grunt.registerTask("dist", ["sass:dist", "postcss:dist"]);
  grunt.registerTask("default", ["dist"]);
};