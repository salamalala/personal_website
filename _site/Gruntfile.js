'use strict';

module.exports = function (grunt) {

    // Show elapsed time after tasks run to visualize performance
    require('time-grunt')(grunt);
    // Load all Grunt tasks that are listed in package.json automagically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // shell commands for use in Grunt tasks
        shell: {
            jekyllBuild: {
                command: 'jekyll build'
            },
            jekyllServe: {
                command: 'jekyll serve'
            }
        },

        // watch for files to change and run tasks when they do
        watch: {
            sass: {
                files: ['_sass/**/*.{scss,sass}'],
                tasks: ['sass']

            },
            js: {
              files: ['assets/*.js'],
              tasks: ['uglify']
            }
        },

        // sass (libsass) config
        sass: {
            options: {
                sourceMap: true,
                relativeAssets: false,
                outputStyle: 'expanded',
                sassDir: '_sass',
                cssDir: '_site/assets'
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '_sass/',
                    src: ['**/*.{scss,sass}'],
                    dest: '_site/assets',
                    ext: '.css'
                }]
            }
        },

        // add autoprefixer after css has been created
        postcss: {
            options: {
              map: true, // inline sourcemaps

              processors: [
                require('pixrem')(), // add fallbacks for rem units
                require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
                require('cssnano')() // minify the result
              ]
            },
            dist: {
              src: '_site/assets/*.css'
            }
        },

        uglify: {
            dist: {
                files: {
                  'assets/main-min.js': [
                    'bower_components/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
                    'bower_components/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
                    'assets/*.js'
                    ]
                }
            }
        },

        // run tasks in parallel
        concurrent: {
            serve: [
                'sass',
                'watch',
                'uglify',
                'shell:jekyllServe'
            ],
            options: {
                logConcurrentOutput: true
            }
        }

    });

    // Register the grunt serve task
    grunt.registerTask('serve', [
        'concurrent:serve'
    ]);

    // Register the grunt build task
    grunt.registerTask('build', [
        'postcss',
        'uglify',
        'shell:jekyllBuild'
    ]);

    // Register build as the default task fallback
    grunt.registerTask('default', 'build');

};
