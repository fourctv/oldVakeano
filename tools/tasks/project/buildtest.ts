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
  };


const BUNDLER_OPTIONS = {
    format: 'cjs',
    minify: true,
    mangle: true
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


const buildBundle = (theapp:any) => {
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

const bundleModule = (bundle: Bundle) => {
  let builder = new Builder(Config.SYSTEM_BUILDER_CONFIG);
  let module = join(Config.TMP_DIR, Config.BOOTSTRAP_DIR, bundle.path, bundle.module);
  let main = join(Config.JS_DEST, Config.JS_PROD_APP_BUNDLE);
  let expression = `${module} - ${main}`;
  console.log('bundling', expression);
  return builder
    .bundle(
      expression,
      join(Config.JS_DEST, 'lazy', bundle.module + '.js'),
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
  Config.SYSTEM_BUILDER_CONFIG.paths['dist/prod/*']='dist/prod/*';
  console.log(Config.SYSTEM_BUILDER_CONFIG);
  bundleModule(config[0]);
};


