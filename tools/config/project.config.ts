import { join } from 'path';
import { SeedAdvancedConfig } from './seed-advanced.config';
// import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedAdvancedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  // ----------------
  // WebApps Configuration.
  //
  WEB_APP_NAME = '';
  WEB_APP_TITLE= '';
  WEB_APP_MAIN = '';
  WEB_APP_SELECTOR = '';

  WEB_APPS_CONFIG = [
    { name: 'nsApp', title: 'Movie Genome', app: 'mainNS.web', selector: 'sd-app', path: 'appNS/app.component', bundle: false },
    { name: 'featureList', title: 'Features', app: 'featureListMain', selector: 'feature-list', path: 'featureList/featureList', bundle: true  },
    { name: 'genomeMapList', title: 'Genome Map', app: 'genomeMapListMain', selector: 'genomemap-list', path: 'genomeMapList/genomeMapList', bundle: true },
    { name: 'userProfileList', title: 'User Profiles', app: 'userProfileListMain', selector: 'userprofile-list', path: 'userProfileList/userProfileList', bundle: true },
    { name: 'userRecommendations', title: 'User Recommendations', app: 'userRecommendationsMain', selector: 'userRecommendations', path: 'userRecommendations/userRecommendations', bundle: true },
    { name: 'userRating', title: 'User Rating', app: 'userRatingMain', selector: 'userrating', path: 'userRating/userRating', bundle: true }
  ];

  
  constructor() {
    super();
    this.APP_TITLE = 'Vakeano';

    let additional_deps = [
     { src: 'systemjs/dist/system.src.js', inject: 'shims' },
     // My libraries
      { src: 'base-64/base64.js', inject: 'libs' },
      { src: 'jquery/dist/jquery.min.js', inject: 'libs' },
      { src: '/MovieGenome/Vakeano/src/client/assets/kendo-ui/js/kendo.all.min.js', inject: 'libs', env: 'dev' },
 //     { src: 'backbone/backbone-min.js', inject: 'libs' },
      //   { src: 'bootstrap/dist/js/bootstrap.js', inject: 'libs'},

      { src: '/MovieGenome/Vakeano/src/client/assets/kendo-ui/styles/kendo.common.min.css', inject: true },
      { src: '/MovieGenome/Vakeano/src/client/assets/kendo-ui/styles/kendo.default.min.css', inject: true },
      { src: 'bootstrap/dist/css/bootstrap.css', inject: true }
    ];

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      ...additional_deps
    ];

    this.SYSTEM_CONFIG.paths[this.BOOTSTRAP_MODULE] = `${this.APP_BASE}mainMG.web`;
    this.SYSTEM_BUILDER_CONFIG.paths['base-64']=`${this.APP_BASE}node_modules/base-64/base64.js`;

        // Fix up paths for base-64
    this.SYSTEM_CONFIG.paths['base-64'] = `${this.APP_BASE}node_modules/base-64/base64`;

    this.BOOTSTRAP_PROD_MODULE = 'mainMG.web';


    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    // Add packages (e.g. ng2-translate)
    // ng2-translate is already added with the advanced seed - here for example only
    // let additionalPackages: ExtendPackages[] = [{
    //   name: 'ng2-translate',
    //   // Path to the package's bundle
    //   path: 'node_modules/ng2-translate/bundles/ng2-translate.umd.js'
    // }];
    //
    // this.addPackagesBundles(additionalPackages);

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
  }

}
