'use strict';

module.exports = function (grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Configurable paths
    var config = {
        src: 'src',
        dist: 'dist',
        test: 'test',
        lib: 'test/lib'
    };

    grunt.initConfig({

        config: config,
        pkg: grunt.file.readJSON('package.json'),

        // Cleaning the release directory
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            }
        },

        // Concatenation of source files
        concat: {
            dist: {
                src: [
                    '<%= config.src %>/mithril-storage.prefix.js',
                    '<%= config.src %>/storage/*.js',
                    '<%= config.src %>/mithril-storage.js',
                    '<%= config.src %>/mithril-storage.suffix.js',
                ],
                dest: '<%= config.dist %>/mithril-storage.js'
            }
        },

        // Minification uglify
        uglify: {
            dist: {
                files: {
                    '<%= config.dist %>/mithril-storage.min.js': [
                        '<%= config.dist %>/mithril-storage.js'
                    ]
                },
                options: {
                    mangle:false,
                    sourceMap: 'mithril-storage.js.map',
                    sourceMapRoot: 'http://localhost/',
                    banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                }
            }
        },

        // Testing via jasmine
        jasmine: {
            src: [
                '<%= config.lib %>/mithril/mithril.js' ,
                '<%= config.lib %>/mithril/mock.js' ,
                '<%= config.src %>/storage/*.js',
                '<%= config.src %>/mithril-storage.js'
            ],
            options: {
                specs : '<%= config.test %>/**/*.js'
            }
        },

        // Testing server
        connect: {
            test: {
                options: {
                    hostname: 'localhost',
                    port: 9901,
                    base: '.'
                }
            }
        }
    });

    //run just the tests
    grunt.registerTask('test', ['connect:test', 'jasmine' ]);
    // Build the package
    grunt.registerTask('build', [ 'clean:dist', 'concat:dist', 'uglify' ]);

};
