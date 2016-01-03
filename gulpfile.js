var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');

gulp.task('compileScripts', ()=> {
  return gulp.src('src/scripts/**/*.js')
    .pipe(babel({
      'presets': ['es2015']
    }))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('public/dist/scripts'))
    .on('error', (err)=> {
      console.log(`compile scripts error : ${err.message}`);
      this.end();
    })
    ;
});

gulp.task('preProcCss', ()=> {
  return sass('src/styles/*.scss')
    .pipe(gulp.dest('public/dist/styles'))
    .on('error', (err)=> {
      console.log(`pre-process sass files error : ${err.message}`);
      this.end();
    })
    ;
});

gulp.task('default', ['compileScripts', 'preProcCss'], ()=> {
  gulp.watch('src/**/*.js', ['compileScripts']);
  gulp.watch('src/**/*.scss', ['preProcCss']);
});