module.exports = {
    html: {
        src: 'scripts/**/*tmpl.html',
        srcProd: ['scripts/main.js', 'scripts/ngTemplates.js'],
        prodFileName: 'main.js',
        dest: 'scripts/',
        templateName: 'ngTemplates.js'
    },
    autoprefixer: {
        browsers: [
            'last 2 versions',
            'safari 5',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4'
        ],
        cascade: true
    },
    less: {
        srcProd: "styles/main.css",
        src: 'styles/*.less',
        dest: 'styles/'
    },
    js: {
        srcProd: "scripts/main.js",
        outputFileName: "main.js",
        src: [
            "bower_components/underscore/underscore-min.js",
            "bower_components/jquery/dist/jquery.min.js",
            "bower_components/velocity/velocity.min.js",
            "bower_components/angular/angular.min.js",
            "bower_components/angular-cookies/angular-cookies.min.js",
            "bower_components/angular-animate/angular-animate.min.js",
            "bower_components/angular-sanitize/angular-sanitize.min.js",
            "bower_components/angular-ui-router/release/angular-ui-router.min.js",
            "scripts/ngTemplates.js",
            "scripts/modules/**/*.js",
            "scripts/dev/app.js",
            "scripts/dev/**/**/**/*.js"
        ],
        dest: './scripts/'
    },
    watch: {
        less: 'styles/**/**/**/*.less',
        uri: ['images/icons/**/*'],
        scripts: [
            'scripts/dev/**/**/*.js',
            'scripts/modules/**/*.js'
        ],
        html: 'scripts/**/*tmpl.html'
    },
    uri: {
        src: ['./images/icons/**/*'],
        dest: './styles/common/',
        template: './gulp/icons-template.css'
    },
    copy: {
        src: ["index.html", "route.json", "styles/main*.css", "scripts/main-*.js", "images/**/*", "scripts/login/*", "fonts/*", "mocks/*"],
        dest: "../prod/"
    },
    del: {
        temp: ["styles/main-*.css", "styles/rev-manifest.json", "scripts/main-*.js", "scripts/rev-manifest.json"],
        prod: "../prod/"
    },
    war: {
        src: "../prod/*"
    },
    manifest: {
        dest: '../prod/',
        src: "../prod/index.html",
        files: ["styles/rev-manifest.json", "scripts/rev-manifest.json"]
    },
    rev: {
        config: {
            base: './',
            merge: true // merge with the existing manifest (if one exists)
        }
    },
    htmlRevisionInject: {
        src: "../../prod/index.html",
        dest: '../../prod/'
    },
    imagemin: {
        src: "../prod/images/*",
        dest: "../prod/images/"
    },
    plugins: {
        scope: ['dependencies', 'devDependencies', 'peerDependencies'],
        rename: {
            'gulp-ng-annotate': 'ngannotate',
            'gulp-sourcemaps': 'sourcemaps',
            'gulp-plumber': 'plumber',
            'gulp-less': 'less',
            'gulp-autoprefixer': 'autoprefixer',
            'gulp-cssnano': 'minifyCSS',
            'gulp-image-data-uri': 'uri',
            'gulp-concat': 'concat',
            'gulp-uglify': 'uglify',
            'gulp-copy': 'copy',
            'gulp-rev': 'rev',
            'gulp-rev-replace': 'revreplace',
            'gulp-imagemin': 'imagemin',
            'gulp-ng-html2js': 'html2js',
            'gulp-minify-html': 'minifyHtml',
            'gulp-wrap': 'wrap',
            'gulp-war': 'war',
            'gulp-zip': 'zip'
        }
    }
};