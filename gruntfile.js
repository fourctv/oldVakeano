module.exports = function (grunt) {
    // Do grunt-related things in here
    grunt.initConfig({
        replace: {
            fixProtractor: {
                src: ['node_modules/@types/protractor/index.d.ts'],
                overwrite: true,                 // overwrite matched source files 
                replacements: [{
                    from: 'declare var $: cssSelectorHelper;',
                    to: '//declare var $: cssSelectorHelper;'
                }]
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.registerTask('default', ['replace']);

};
