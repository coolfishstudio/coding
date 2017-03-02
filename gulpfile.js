var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-minify-css');
var rev = require('gulp-rev');
var clean = require('gulp-clean');

gulp.task('taskCodeJs', function () {
    gulp.src([
        './public/lib/codemirror/codemirror.js',
        './public/lib/codemirror/addon/fold/foldcode.js',
        './public/lib/codemirror/addon/fold/foldgutter.js',
        './public/lib/codemirror/addon/fold/brace-fold.js',
        './public/lib/codemirror/addon/fold/xml-fold.js',
        './public/lib/codemirror/addon/fold/indent-fold.js',
        './public/lib/codemirror/addon/fold/markdown-fold.js',
        './public/lib/codemirror/addon/fold/comment-fold.js',
        './public/lib/codemirror/addon/selection/active-line.js',
        './public/lib/codemirror/addon/edit/matchbrackets.js',
        './public/lib/codemirror/addon/edit/closetag.js',
        './public/lib/codemirror/addon/fold/xml-fold.js',
        './public/lib/codemirror/addon/edit/matchtags.js',
        './public/lib/codemirror/mode/xml.js',
        './public/lib/codemirror/mode/javascript.js',
        './public/lib/codemirror/mode/css.js',
        './public/lib/codemirror/mode/htmlmixed.js'
    ])
    .pipe(concat('codemirror.min.js'))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/dist'))
    .pipe(rev.manifest());
});

gulp.task('taskCodeCss', function () {
    gulp.src([
        './public/lib/codemirror/codemirror.css',
        './public/lib/codemirror/theme/ambiance.css',
        './public/lib/codemirror/addon/fold/foldgutter.css'
    ])
    .pipe(concat('codemirror.min.css'))
    .pipe(cssmin())
    .pipe(rev())
    .pipe(gulp.dest('./public/dist'))
    .pipe(rev.manifest());
});

gulp.task('clean', function () {
    gulp.src(['./public/dist', './public/rev'], {read: false})
        .pipe(clean());
});

gulp.task('taskEditorCss', function () {
    gulp.src([
        './public/css/style.css'
    ])
    .pipe(concat('main.min.css'))
    .pipe(cssmin())
    .pipe(rev())
    .pipe(gulp.dest('./public/dist'))
    .pipe(rev.manifest());
});

gulp.task('taskEditorJs', function () {
    gulp.src([
        './public/js/editor.js',
    ])
    .pipe(concat('editor.min.js'))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/dist'))
    .pipe(rev.manifest());
});

gulp.task('build', ['clean', 'taskCodeCss', 'taskCodeJs', 'taskEditorCss', 'taskEditorJs']);
