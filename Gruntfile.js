module.exports = function(grunt){
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'public/style.css': 'public/style.scss'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      },
      js: {
        files: '**/*.js'
      },
      html: {
        files: 'views/index.ejs'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
};