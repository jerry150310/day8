const gulp = require("gulp");
const webserver = require("gulp-webserver");
const listData = require("./src/data/data.json");

gulp.task("server", () => {
    gulp.src("./src")
        .pipe(webserver({
            port: 3030,
            livereload: true,
            proxies: [{
                source: "/render",
                target: "http://localhost:4040/render"
            }]
        }))
})
gulp.task("serverData", () => {
    gulp.src(".")
        .pipe(webserver({
            port: 4040,
            middleware: (req, res, next) => {
                res.setHeader('content-type', 'application/json');
                const { pathname, query } = require("url").parse(req.url, true);
                switch (pathname) {
                    case "/render/":
                        res.end(JSON.stringify(listData))
                        break;
                }
            }
        }))
})
gulp.task("default", gulp.parallel("server", "serverData"))