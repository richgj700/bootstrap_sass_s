module.exports = function(grunt) {

  // Initialize configuration object
    grunt.initConfig({

    // Define configuration for each task
    compass: {                  // Task 
      development: {            // Target 
        options: {              // Target options 
          sassDir: 'sass',
          cssDir: './',
          environment: 'development',
          outputStyle: 'compressed', //or nested or compact or compressed
          relativeAssets: true,
          noLineComments: true
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      js_script: { // Include as required
        src: [
          // './bower_components/bootstrap-sass/assets/javascripts/bootstrap/affix.js',
          // './bower_components/bootstrap-sass/assets/javascripts/bootstrap/alert.js',
          // './bower_components/bootstrap-sass/assets/javascripts/bootstrap/button.js',
          // './bower_components/bootstrap-sass/assets/javascripts/bootstrap/carousel.js',
          // './bower_components/bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
          // './bower_components/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
          // './bower_components/bootstrap-sass/assets/javascripts/bootstrap/modal.js',
          // './bower_components/bootstrap-sass/assets/javascripts/bootstrap/popover.js',
          // './bower_components/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js',
          // './bower_components/bootstrap-sass/assets/javascripts/bootstrap/tab.js',
          // './bower_components/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js',
          // './bower_components/bootstrap-sass/assets/javascripts/bootstrap/transition.js',
          './bower_components/jquery/dist/jquery.js',
          //'./assets/js/customizer.js',
          //'./assets/js/navigation.js',
          //'./assets/js/skip-link-focus-fix.js',
          './assets/js/script.js'
        ],
        // Concatenate script.js
        dest: './public/js/script.js',
      },
      js_theme: {
        src: [
          './assets/js/theme.js'
        ],
        // Concatenate theme.js
        dest: './public/js/theme.js',
      },
    },
    uglify: {
      options: {
        mangle: false  // Leaves function and variable names unchanged
      },
      script: {
        files: {
          // Minifies  script.js 
          './public/js/script.min.js': './public/js/script.js',
        }
      },
      theme: {
        files: {
          // Minifies theme.js
          './public/js/theme.min.js': './public/js/theme.js',
        }
      },
    },
    imagemin: {
      dynamic: {
        files: [{
            expand: true,
            // Compresses all png / jpg / gif images
            cwd: './assets/img/',
            src: ['**/*.{png,jpg,gif}'],
            dest:'./public/assets/img/'
        }]
      }
    },
    watch: {
        js_script: {
          files: [
            // Watched files
            './assets/js/script.js',
            ],   
          tasks: ['concat:js_script','uglify:script'],
          options: {
          livereload: true
          }
        },
        js_theme: {
          files: [
            // Watched files
            './assets/js/theme.js',
            ],   
          tasks: ['concat:js_theme','uglify:theme'],
          options: {
          livereload: true
          }
        },
        compass: {
          // Watched files
          files: ['./sass/*.scss'],  
          tasks: ['compass'],
          options: {
            livereload: true
          }
        },
        images: {
          // Watched files
          files: ['./assets/img/**/*.{png,jpg,gif}'], 
          tasks: ['imagemin'],
          options: {
          livereload: true
          }
        },
        html: {
          // Watch php for changes
          files: ['**/*.php'],
          tasks: [],
          options: {
          livereload: true
          }
        }
      }
    });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  
  // Compile CSS and Javascript
  grunt.registerTask('compile', ['concat', 'compass', 'uglify', 'imagemin']);

  // Set default task
  grunt.registerTask('default', ['watch']);

};