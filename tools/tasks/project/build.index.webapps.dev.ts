import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import {join} from 'path';
import * as slash from 'slash';

import Config from '../../config';
import { ProjectConfig } from '../../config/project.config';

const plugins = <any>gulpLoadPlugins();

var rename = require('gulp-rename');


/**
 * Executes the build process, injecting the shims and libs into the `webapp.hml` for the development environment.
 * and saves it as the individual webapp index.html
 */
function buildWebappIndex(app:any) {
    // set up web app info
    let myConfig = new ProjectConfig();
    myConfig.WEB_APP_NAME = app.name;
    myConfig.WEB_APP_TITLE = app.title;
    myConfig.WEB_APP_MAIN = app.app;
    myConfig.WEB_APP_SELECTOR = app.selector;

    gulp.src(join(Config.APP_SRC, 'webapp.html'))
        .pipe(inject('shims'))
        .pipe(inject('libs'))
        .pipe(inject())
        .pipe(plugins.template(myConfig))
        .pipe(rename(app.name + '.html'))
        .pipe(gulp.dest(Config.APP_DEST));
}

/**
 * Injects the file with the given name.
 * @param {string} name - The file to be injected.
 */
function inject(name?: string) {
    return plugins.inject(gulp.src(getInjectablesDependenciesRef(name), { read: false }), {
        name,
        transform: transformPath()
    });
}

/**
 * Returns the injectable dependency, mapping its filename to its path.
 * @param {string} name - The dependency to be mapped.
 */
function getInjectablesDependenciesRef(name?: string) {
    return Config.DEPENDENCIES
        .filter(dep => dep['inject'] && dep['inject'] === (name || true))
        .map(mapPath);
}

/**
 * Maps the path of the given dependency to its path according to the applications environment.
 * @param {any} dep - The dependency to be mapped.
 */
function mapPath(dep: any) {
  let envPath = dep.src;
  if (envPath.startsWith(Config.APP_SRC) && !envPath.endsWith('.scss')) {
    envPath = join(Config.APP_DEST, envPath.replace(Config.APP_SRC, ''));
  } else if (envPath.startsWith(Config.APP_SRC) && envPath.endsWith('.scss')) {
    envPath = envPath.replace(Config.ASSETS_SRC, Config.CSS_DEST).replace('.scss', '.css');
  }
  return envPath;
}



/**
 * Transform the path of a dependecy to its location within the `dist` directory according to the applications
 * environment.
 */
function transformPath() {
  return function (filepath: string) {
    if (filepath.startsWith(`/${Config.APP_DEST}`)) {
      filepath = filepath.replace(`/${Config.APP_DEST}`, '');
    }
    if (Config.TARGET_DESKTOP) {
      let path = join(Config.APP_BASE, filepath);
      if (path.indexOf('dist/dev') > -1 || path.indexOf('dist\\dev') > -1) {
        path = path.replace(/(dist\/dev\/)|(dist\\dev\\)/g, '');
      }
      arguments[0] = path.substring(1) + `?${Date.now()}`;
    } else {
      arguments[0] = join(Config.APP_BASE, filepath) + `?${Date.now()}`;
    }
    return slash(plugins.inject.transform.apply(plugins.inject.transform, arguments));
  };
}

export = () => {
    return Config.WEB_APPS_CONFIG.map(theapp => { buildWebappIndex(theapp); });
   
};
