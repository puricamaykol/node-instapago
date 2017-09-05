var gulp        = require('gulp');
var rename = require('gulp-rename');
//var uglify = require('gulp-uglify');
const babili = require("gulp-babili");
var gutil = require('gulp-util');

gulp.task('uglify', function() {
    return gulp.src('./src/InstaPago.js')
        .pipe(rename('instapago.min.js'))
        //.pipe(uglify())
        .pipe(babili({
          mangle: {
            keepClassName: true
          }
        }))
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('build'));
});
 
gulp.task('default', ['uglify']);