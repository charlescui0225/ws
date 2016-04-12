module.exports = function(grunt) {
  // grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');

  grunt.initConfig({
    watch: {
      scripts: {
        files: ['src/assets/**/*.scss', 'src/jade/*.jade'],
        tasks: ['default']
      },
      options: {
        spawn: false,
        debounceDelay: 300
      }
    },
    sass: {
      lib: {
        files: [{
          expand: true,
          cwd: 'src/assets/',
          src: ['main.scss'],
          dest: 'build/css',
          ext: '.css'
        }]
      }
    },
    jade: {
      lib: {
        files: [{
          expand: true,
          cwd: 'src/jade/',
          src: ['*.jade'],
          dest: 'build/html',
          ext: '.html'
        }]
      }
    },
    shell: {
      moveFontLib: {
        command: 'cp -r src/lib/* build/'
      },
      concatAllScss: {
        command: 'node concatAllScss.js'
      },
      cleanMap: {
        command: 'rm -rf build/**/*.css.map'
      }
    }
  });
  grunt.registerTask("buildLib", ["shell:concatAllScss", "shell:moveFontLib", "sass:lib", "jade:lib", "shell:cleanMap"]);
  return grunt.registerTask("default", ["buildLib", "watch:scripts"]);
};
