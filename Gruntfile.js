/*global module:false*/
module.exports = function(grunt) {

	// Initialisiert Grunt mit den folgenden Projekteinstellungen
	grunt.initConfig({
		less: {
			dev: {
				options: {
					paths: ["style/less"]
				},
				files: {
					"style/css/screen.css": "style/less/screen.less"
				}
			},
			prod: {
				options: {
					paths: ["style/less"],
					yuicompress: true

				},
				files: {
					"style/css/screen.css": "style/less/screen.less"
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
				globals: {
					jQuery: true,
					$ : true,
					"browser" : true,
					"feeds": true,
					"$settings": true,
					"save_settings" : true,
					"$loaded_feeds": true,
					"Feed": true,
					"notify": true
				}
			},
			src: [
				"js/feed.class.js"
				, "js/notigication.class.js"
				, "js/app.js"
			]
		},
		
		/*
			Watch less files
		*/
		watch: {
			styles: {
			// not using "less.prod.files" but ALL less files.
				files: '**/*.less',
				tasks: ['less:dev']
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task
	grunt.registerTask('default', ['less:dev']);
	//grunt.registerTask('production', ['less:prod', 'concat:prod']);

};
