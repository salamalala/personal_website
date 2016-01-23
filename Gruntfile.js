module.exports = function(grunt){

  grunt.initConfig({
    
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
            'css/main.css': 'css/sass/main.scss'
        }
      }
    },

    watch:{
      sass:{
        files:['**/*.scss'],
        tasks: ['sass'],
      }
    }
  });


  // Default Task
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');



  grunt.registerTask('default', [
    'sass',
    'watch'
    ]);
};

