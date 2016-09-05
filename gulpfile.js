let gulp = require('gulp')
let sass = require('node-sass')

gulp.task('preProcCss', () => {
  return sass
    .render({
      file: 'src/styles/style.scss',
      outFile: 'public/dist/styles/style.css',
      outputStyle: 'compressed'
    })
})
