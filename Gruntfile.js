/*global module:false*/
module.exports = function(grunt) {

	// Initialisiert Grunt mit den folgenden Projekteinstellungen
	grunt.initConfig({
		
		less: {
			dev: {
				options: {
					paths: ["src/style/less"]
				},
				files: {
					"dist/style/screen.css": "src/style/less/screen.less"
				}
			},
			prod: {
				options: {
					paths: ["style/less"],
					yuicompress: true

				},
				files: {
					"dist/style/screen.css": "src/style/less/screen.less"
				}
			}
		},

		recess: {
			dev: {
				src: [ 'src/style/less/screen.less' ],
				options: {
					noIDs: false,
					noUnderscores: false,
					noOverqualifying: false,
					noUniversalSelectors: false
				}
			}
		},

		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				quotmark: "single",
				undef: true,
				unused: false,
				trailing: true,
				regexdash: true,

				jquery: true,
				browser: true,
				devel: true,

				globals: {
					jQuery: true,
					$ : true,
					"feeds": true,
					"$settings": true,
					"save_settings" : true,
					"save_feed_config" : true,
					"$loaded_feeds": true,
					"Feed": true,
					"notify": true,
					"open_add_feed_form": true,
					"open_settings_form": true,
					"applySettings": true,
					"$id": true,
					"$site_url": true,
					"$feed_url": true,
					"$site_title": true,
					"$entries": true,
					_: false

				}
			},
			src: [
				"src/js/notification.class.js"
				, "src/js/feed.class.js"
				, "src/js/form.feed_add.js"
				, "src/form.settings.js"
				, "src/js/ledashboard.js"
			]

		},
		
		/*
		 * Copy Task
		 */
		
		copy: {
			images: {
				expand: true,
				flatten: true,
				src: [ 
					"src/style/img/*.jpg",  
					"src/style/img/*.png", 
					"src/style/img/*.ico",
					"src/style/img/*.gif",
					 ],
				dest: "dist/img/" 
			},
			jqueryui: {
				expand: true,
				src: "**",
				cwd: "src/style/css/",
				dest: "dist/style/css/"
			}
		},
		
		concat: {
			controllers: {
				src: [ 'src/js/controllers/*.js' ],
				dest:'dist/js/controllers.js' 
			},
			appjs: {
				src: [ 'src/js/app.js', 'src/js/app.*.js' ],
				dest: 'dist/js/app.js'
			}
		},
		
		
		/*
			Watch files
		*/
		watch: {
			styles: {
			// not using "less.prod.files" but ALL less files.
				files: '**/*.less',
				tasks: ['recess:dev', 'less:dev']
			},
			app: {
				files: [ 'src/js/app.js', 'src/js/app*.js' ],
				tasks: [ 'concat:appjs' ]
			},
			controllers: {
				files: 'src/js/controllers/*.js',
				tasks: [ 'concat:controllers' ]
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jst');
	grunt.loadNpmTasks('grunt-recess');

	// Default task
	grunt.registerTask('default', [ 'recess:dev', 'less:dev', 'copy' ]);
	//grunt.registerTask('production', ['less:prod', 'concat:prod']);

};
