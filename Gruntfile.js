module.exports = function (grunt) {

   grunt.initConfig({

      pkg:grunt.file.readJSON("package.json")
      
   ,  concat: {
         oboe:{         
            src: [
               'src/util.js'            
            ,  'src/libs/polyfills.js'
            ,  'src/libs/clarinet.js'               
            ,  'src/streamingXhr.js'
            ,  'src/jsonPath.js'
            ,  'src/jsonBuilder.js'
            ,  'src/oboe.js'
            ],
            dest: 'dist/oboe.concat.js'
         }
      }
      
   ,  wrap: {
         export: {
            src: 'dist/oboe.concat.js',
            dest: '.',
            wrapper: [
               // having a local undefined and window allows slightly better minification:
               '(function (window, undefined) {' 
            ,  'window.oboe = oboe; })(window);'
            ]
         }
      }      
            
   ,  uglify: {
         build:{
            files:{
               'dist/oboe.min.js': 'dist/oboe.concat.js'
            }
         }
      }
      
   ,  jstestdriver: {

         options:{
            verbose:true
         }
      ,  files:{src:['test/jsTestDriver-dev.conf']}  
      }      

   });

   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-wrap');
   grunt.loadNpmTasks('grunt-contrib-uglify');   
   grunt.loadNpmTasks('grunt-jstestdriver');   

   grunt.registerTask('devtest', ['jstestdriver']);
   grunt.registerTask('build', ['concat:oboe']);
   grunt.registerTask('minify', ['uglify']);   
   grunt.registerTask('default', ['concat:oboe', 'wrap:export', 'uglify']);

};