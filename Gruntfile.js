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


	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task
	grunt.registerTask('default', ['less:dev']);
	//grunt.registerTask('production', ['less:prod', 'concat:prod']);

};
