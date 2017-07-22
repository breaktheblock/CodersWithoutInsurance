/**
 * Gruntfile
 */
var path = require('path');

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

    grunt.initConfig({
    	// Mocha config
        mochaTest: {
            test: {
                src: ['test/**/*_test.js']
            }
        },
	    // Nodemon
		nodemon: {
			dev: {
				script: '.',
				options: {
					ignore: ['test/**', 'public/**', 'logs/**']
				}
			}
		},
		concurrent: {
	        dev: ['nodemon:dev', 'watch'],
            options: {
                logConcurrentOutput: true
            }
	    },

        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: path.resolve(__dirname, 'styles'),
                    src: ['style.scss'],
                    dest: path.resolve(__dirname, 'public/css'),
                    ext: '.css'
                }]
            }
        },

        watch: {
            files: [path.resolve(__dirname, 'styles/**/*.scss')],
            tasks: 'sass'
        },
    });

    grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('test', 'mochaTest');
	grunt.registerTask('start', ['concurrent:dev']);
};
