import { join } from 'path';
import * as Builder from 'systemjs-builder';

import Config from '../../config';

const BUNDLER_OPTIONS = {
    format: 'cjs',
    minify: true,
    mangle: false
};

const MG_DIR = join(Config.TMP_DIR, 'app/components');
const ModuleDir = join(Config.PROD_DEST,'js');

const buildStaticBundle = (theapp) => {
    if (theapp.bundle) {
        console.log(join(MG_DIR,`${theapp.path}.js`)+ ' -> ' + join(Config.PROD_DEST,`${theapp.path}.js`));
        let builder = new Builder(Config.SYSTEM_BUILDER_CONFIG);
        return builder.buildStatic(join(Config.TMP_DIR, `${theapp.app}.js`),
                join(Config.PROD_DEST, `${theapp.app}.js`),
                BUNDLER_OPTIONS);
    } else return null;

};


const buildBundle = (theapp) => {
    if (theapp.bundle) {
        console.log(join(MG_DIR,`${theapp.path}Module.js`)+ ' -> ' + join(ModuleDir,`${theapp.name}Module.js`));
        let builder = new Builder(Config.SYSTEM_BUILDER_CONFIG);
        return builder.buildStatic(join(MG_DIR,`${theapp.path}Module.js`), 
                join(ModuleDir,`${theapp.name}Module.js`),
                Object.assign({}, BUNDLER_OPTIONS, { format: 'amd' }));
    } else return null;

};


/**
 * Executes the build process, bundling the JavaScript files using the SystemJS builder.
 */
export = (done: any) => {
  const config = Config.WEB_APPS_CONFIG;
  /*
  Promise.all(config.map(buildStaticBundle.bind(config)))
    .then(() => Promise.all(config.map(buildBundle.bind(config))))
    .then(() => done())
    .catch((e: any) => done(e));
    */
  Promise.all(config.map(buildBundle.bind(config)))
    .then(() => done())
    .catch((e: any) => done(e));
};
