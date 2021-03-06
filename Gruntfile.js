module.exports = function(grunt){
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'public/css/style.css': 'public/css/style.scss'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: 'public/**/*.scss',
        tasks: ['sass']
      },
      js: {
        files: 'public/**/*.js'
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