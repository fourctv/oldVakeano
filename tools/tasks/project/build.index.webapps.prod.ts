import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join, sep, normalize } from 'path';
import * as slash from 'slash';

import Config from '../../config';
import { ProjectConfig } from '../../config/project.config';

const plugins = <any>gulpLoadPlugins();

var rename = require('gulp-rename');

/**
 * Executes the build process, injecting the JavaScript and CSS dependencies into the `webapp.html` for the production
 * environment. And renames resulting file to the proper webapp index.html
 */
function buildWebappIndex(app:any) {
    // set up web app info
    let myConfig = new ProjectConfig();
    myConfig.WEB_APP_NAME = app.name;
    myConfig.WEB_APP_TITLE = app.title;
    myConfig.WEB_APP_MAIN = app.app;
    myConfig.WEB_APP_SELECTOR = app.selector;

  return gulp.src(join(Config.APP_SRC, 'webapp.html'))
    .pipe(injectJs(app.app))
    .pipe(injectCss())
    .pipe(plugins.template(myConfig))
    .pipe(rename(app.name + '.html'))
    .pipe(gulp.dest(Config.APP_DEST));
};

/**
 * Injects the given file array and transforms the path of the files.
 * @param {Array<string>} files - The files to be injected.
 */
function inject(...files: Array<string>) {
    return plugins.inject(gulp.src(files, { read: false }), {
        files,
        transform: transformPath()
    });
}

/**
 * Injects the bundled JavaScript shims and application bundles for the production environment.
 */
function injectJs(appName:string) {
  return inject(join(Config.JS_DEST, Config.JS_PROD_SHIMS_BUNDLE),
                      '/MovieGenome/Vakeano/src/client/assets/kendo-ui/js/kendo.all.min.js', 
                      join(Config.TMP_DIR, appName+'.js'));
}

/**
 * Injects the bundled CSS files for the production environment.
 */
function injectCss() {
  return inject(join(Config.CSS_DEST, Config.CSS_PROD_BUNDLE));
}

/**
 * Transform the path of a dependecy to its location within the `dist` directory according to the applications
 * environment.
 */
function transformPath() {
  return function(filepath: string) {
    let path: Array<string> = normalize(filepath).split(sep);
    let slice_after = path.indexOf(Config.APP_DEST);
    if (slice_after > -1) {
      slice_after++;
    } else {
      slice_after = 3;
    }
    arguments[0] = Config.APP_BASE + path.slice(slice_after, path.length).join(sep) + `?${Date.now()}`;
    return slash(plugins.inject.transform.apply(plugins.inject.transform, arguments));
  };
}

export = () => {
    gulp.src('/MovieGenome/Vakeano/node_modules/kendo-ui/styles/Default/*').pipe(gulp.dest(join(Config.CSS_DEST,'Default')));
    return Config.WEB_APPS_CONFIG.map(theapp => { buildWebappIndex(theapp); });
   
};
