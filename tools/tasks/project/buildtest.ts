import { appendFileSync } from 'fs';
import { join } from 'path';
import * as Builder from 'systemjs-builder';

import Config from '../../config';

interface Bundle {
   name: string; 
   title: string; 
   module: string;
   selector: string; 
   path: string;
   bundle: boolean; };


const BUNDLER_OPTIONS = {
    format: 'umd',
    minify: false, uglify: false,
    mangle: false
};

const addExtensions = `
System.config({ defaultJSExtensions: true });
(function () {
  Object.keys(System.defined).forEach(function (m) {
    if (!/\.js$/.test(m)) {
      System.defined[m + '.js'] = System.defined[m];
    }
  });
}());
`;

const MG_DIR = join(Config.TMP_DIR, 'app/components');
const ModuleDir = join(Config.PROD_DEST,'js');


const buildBundle = (theapp) => {
    console.log(join(MG_DIR,`${theapp.path}Module.js`)+ ' -> ' + join(ModuleDir,`${theapp.name}Module.js`));
    let builder = new Builder(Config.SYSTEM_BUILDER_CONFIG);
    return builder.buildStatic(join(MG_DIR,`${theapp.path}Module.js`), 
            join(ModuleDir,`${theapp.name}Module.js`),
            Object.assign({}, BUNDLER_OPTIONS, { format: 'amd' }));

};
  
const bundleMain = () => {
  const builder = new Builder(Config.SYSTEM_BUILDER_CONFIG);
  const mainpath = join(Config.TMP_DIR, Config.BOOTSTRAP_PROD_MODULE);
  const outpath = join(ModuleDir, Config.JS_PROD_APP_BUNDLE);
  console.log('main', mainpath, 'output',outpath);
  return builder
    .buildStatic(mainpath,
      outpath,
      BUNDLER_OPTIONS)
      .then((res: any) => {
        appendFileSync(outpath, `${addExtensions}`);
        return res.modules;
      });
};

const bundleModule = (config: Bundle[], exclude: string[], bundle: Bundle) => {
  let builder = new Builder(Config.SYSTEM_BUILDER_CONFIG);
  let all = join(Config.TMP_DIR, Config.BOOTSTRAP_DIR);
  let bootstrap = join(Config.TMP_DIR, Config.BOOTSTRAP_DIR, bundle.path, bundle.module);
  let bootstrapDir = join(Config.TMP_DIR, Config.BOOTSTRAP_DIR, bundle.path);
  let expression = `${bootstrap} - (${all}/**/*.js - ${bootstrapDir}/**/*.js) - ${exclude.join(' - ')}`;
  console.log('bundling', join(ModuleDir, bundle.module + '.js'));
  return builder
    .buildStatic(
      expression,
      join(ModuleDir, bundle.module + '.js'),
      BUNDLER_OPTIONS)
      .then((res: any) => {
        console.log(res.modules);
        console.log('Bundled', bundle.path);
        return res;
      });
};

/**
 * Executes the build process, bundling the JavaScript files using the SystemJS builder.
 */
export = (done: any) => {
  const config = [
    { name: 'userRating', title: 'User Rating', module: 'userRatingModule', selector: 'userrating', path: 'app/components/userRating' }
  ];
  bundleMain()
    .then((bundled: string[]) => Promise.all(config.map(bundleModule.bind(null, config, bundled))))
    .then(() => done())
    .catch((e: any) => done(e));
};


