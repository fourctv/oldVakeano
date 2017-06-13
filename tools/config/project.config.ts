import { join } from 'path';
import { SeedAdvancedConfig } from './seed-advanced.config';
import { ExtendPackages } from './seed.config.interfaces';

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
  WEB_APP_TITLE = '';
  WEB_APP_MAIN = '';
  WEB_APP_SELECTOR = '';

  WEB_APPS_CONFIG = [
    { name: 'nsApp', title: 'Vakeano Genome', app: 'mainNS.web', selector: 'sd-app', path: 'appNS/app.component', bundle: false },
    { name: 'featureList', title: 'Features', app: 'featureListMain', selector: 'feature-list', path: 'featureList/featureList', bundle: true },
    { name: 'genomeMapList', title: 'Genome Map', app: 'genomeMapListMain', selector: 'genomemap-list', path: 'genomeMapList/genomeMapList', bundle: true },
    { name: 'userProfileList', title: 'User Profiles', app: 'userProfileListMain', selector: 'userprofile-list', path: 'userProfileList/userProfileList', bundle: true },
    { name: 'userRecommendations', title: 'User Recommendations', app: 'userRecommendationsMain', selector: 'user-recommendations', path: 'userRecommendations/userRecommendations', bundle: true },
    { name: 'userRating', title: 'User Rating', app: 'userRatingMain', selector: 'user-rating', path: 'userRating/userRating', bundle: true }
  ];


  constructor() {
    super();
    this.APP_TITLE = 'Vakeano';
    // this.GOOGLE_ANALYTICS_ID = 'Your site's ID';

    let additional_deps = [
      { src: 'systemjs/dist/system.src.js', inject: 'shims' },
      // My libraries
      { src: 'base-64/base64.js', inject: 'libs' },
      { src: 'jquery/dist/jquery.min.js', inject: 'libs' },
      // { src: 'http://kendo.cdn.telerik.com/2017.1.118/js/jszip.min.js', inject: 'libs', env: 'dev' },
      // { src: 'http://kendo.cdn.telerik.com/2017.1.118/js/kendo.all.min.js', inject: 'libs', env: 'dev' },
      //     { src: 'backbone/backbone-min.js', inject: 'libs' },
      //   { src: 'bootstrap/dist/js/bootstrap.js', inject: 'libs'},

      // { src: '/MovieGenome/Vakeano/src/client/assets/kendo-ui/styles/kendo.common.min.css', inject: true },
      // { src: '/MovieGenome/Vakeano/src/client/assets/kendo-ui/styles/kendo.default.min.css', inject: true },
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

    if (this.TARGET_DESKTOP) {
      this.SYSTEM_CONFIG.paths[this.BOOTSTRAP_MODULE] = `${this.APP_BASE}mainNS.web`;
    } else {
      this.SYSTEM_CONFIG.paths[this.BOOTSTRAP_MODULE] = `${this.APP_BASE}mainMG.web`;
    }
    this.SYSTEM_BUILDER_CONFIG.paths['base-64'] = 'node_modules/base-64/base64.js';
    this.SYSTEM_BUILDER_CONFIG.paths['jQuery'] = 'node_modules/jquery/dist/jquery.min.js';

    // Fix up paths for base-64
    this.SYSTEM_CONFIG.paths['base-64'] = `${this.APP_BASE}node_modules/base-64/base64`;

    // add kendo-ui for angular2
    this.SYSTEM_CONFIG.paths['@progress/kendo-angular-grid'] = `${this.APP_BASE}node_modules/@progress/kendo-angular-grid/dist/cdn/js/kendo-angular-grid.js`;
    this.SYSTEM_CONFIG.paths['@progress/kendo-angular-intl'] = `${this.APP_BASE}node_modules/@progress/kendo-angular-intl/dist/cdn/js/kendo-angular-intl.js`;
    this.SYSTEM_CONFIG.paths['@progress/kendo-angular-l10n'] = `${this.APP_BASE}node_modules/@progress/kendo-angular-l10n/dist/cdn/js/kendo-angular-l10n.js`;
    this.SYSTEM_CONFIG.paths['@progress/kendo-data-query'] = `${this.APP_BASE}node_modules/@progress/kendo-data-query/dist/cdn/js/kendo-data-query.js`;

    // our bootstrap app 
    this.BOOTSTRAP_PROD_MODULE = 'mainNS.web';


    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    // Add packages (e.g. ng2-translate)
    // ng2-translate is already added with the advanced seed - here for example only
    let additionalPackages: ExtendPackages[] = [
      {
        name: 'ngx-bootstrap/*',
        // Path to the package's bundle
        path: 'node_modules/ngx-bootstrap/bundles/ngx-bootstrap.umd.min.js'
      },
      // mandatory dependency for ngx-bootstrap datepicker 
      {
        name: 'moment',
        path: 'node_modules/moment',
        packageMeta: {
          main: 'moment.js',
          defaultExtension: 'js'
        }
      }
    ];

    this.addPackagesBundles(additionalPackages);

    /* Add proxy middleware */
    // this.PROXY_MIDDLEWARE = [
    //   require('http-proxy-middleware')({ ws: false, target: 'http://localhost:3003' })
    // ];

    /* Add to or override NPM module configurations: */
    // this.PLUGIN_CONFIGS['browser-sync'] = { ghostMode: false };
  }

}
