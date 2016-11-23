var gulp = require('gulp'),
    watch = require('gulp-watch');

var exec = require('child_process').exec;


gulp.task('watch', function () {
    // Endless stream mode 
    return watch(['src/*.css','src/*.js','src/components/*.js'], function(){
        console.log('Rebuiling now')
        exec('npm run build',function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
        });
    })
});