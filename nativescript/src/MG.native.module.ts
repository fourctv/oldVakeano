// nativescript
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptRouterModule, RouterExtensions as TNSRouterExtensions } from 'nativescript-angular/router';

// angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

// plugins
import { NativeScriptUISideDrawerModule } from "nativescript-telerik-ui/sidedrawer/angular";

// libs
//import { StoreModule } from '@ngrx/store';
//import { EffectsModule } from '@ngrx/effects';

// app
import {
  WindowService,
  ConsoleService, ConsoleTarget, LogLevel,
  RouterExtensions,
  AppService
} from './app/modules/core/index';
import { NSAppComponent } from './mobile/appMG/appMG.component';
import { routes } from './mobile/appMG/appMG.component';

// feature modules
import { CoreModule } from './app/modules/core/core.module';
import { JS44DModule } from './app/modules/js44D/js44D.module';
import { FourDInterface } from './app/modules/js44D/js44D/JSFourDInterface';
import { FourDModel } from './app/modules/js44D/js44D/JSFourDModel';
import { FourDCollection } from './app/modules/js44D/js44D/JSFourDCollection';
import { MGModule } from './app/modules/moviegenome/mg.module';
import { LoginNSCmp } from './mobile/login/login';
import { SignUp } from './mobile/login/signUp';

// preferences side bar
import { PreferencePanel } from './mobile/preferences/preferencesPanel';

// applets
import { UserRecommendationPage } from './mobile/recommendations/userRecommendationPage'; 
import { UserRecommendations } from './mobile/recommendations/userRecommendations'; 
import { FeatureRecommendation} from './mobile/recommendations/featureRecommendation';
import { UserRating } from './mobile/userrating/userRating'; 
import { FeatureRating } from './mobile/userrating/featureRating'; 
import { ProfileBuildingPage } from './mobile/userrating/profileBuildingPage'; 
import { CuratedProfiles } from './mobile/recommendations/curatedProfile';
// {N} custom app specific
import { WindowNative, NSAppService } from './mobile/core/index';
import { NS_ANALYTICS_PROVIDERS } from './mobile/analytics/index';

// lazyloading components (not used)
import { JSAppLoader } from './app/modules/js44D/services/jsapploader';
import { FlexAppLoader } from './app/modules/js44D/services/flexapploader';

/**
 * Config
 * Seed provided configuration options
 */
import { Config, LogTarget } from './app/modules/core/index';
import { Page } from 'ui/page';
Config.PageClass = Page;

// (required) platform target (allows component decorators to use the right view template)
Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_NATIVE;

// (optional) log level - defaults to no logging if not set
Config.DEBUG.LEVEL_4 = true;

// (optional) custom i18n language support
// example of how you can configure your own language sets
// you can use the AppConfig class or build something similar into your own framework
//import { AppConfig } from './app/shared/sample/services/app-config';
//import { MultilingualService } from './app/shared/i18n/services/multilingual.service';
//MultilingualService.SUPPORTED_LANGUAGES = AppConfig.SUPPORTED_LANGUAGES;

// intermediate component module
// helps encapsulate custom native modules in with the components
// note: couple ways this could be done, just one option presented here...
@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptUISideDrawerModule,
    MGModule,

  ],
  declarations: [
    LoginNSCmp, SignUp,
    PreferencePanel,
    UserRecommendationPage, UserRecommendations, FeatureRecommendation, 
    UserRating, FeatureRating, ProfileBuildingPage, CuratedProfiles,
    JSAppLoader, FlexAppLoader
  ],
  entryComponents: [FeatureRecommendation, FeatureRating],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[ FourDInterface, FourDModel, FourDCollection ],
  exports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    //MultilingualModule
  ]
})
export class ComponentsModule { }

// For AoT compilation to work:
export function cons() {
  return console;
}

export function consoleLogTarget(service: ConsoleService) {
  return new ConsoleTarget(service, { minLogLevel: LogLevel.Debug });
}

@NgModule({
  imports: [
    CoreModule.forRoot([
      { provide: WindowService, useClass: WindowNative },
      { provide: ConsoleService, useFactory: (cons) },
      { provide: LogTarget, multi: true, deps: [ConsoleService], useFactory: (consoleLogTarget) }
    ]),
    ComponentsModule,
    NativeScriptRouterModule.forRoot(<any>routes)
  ],
  declarations: [
    NSAppComponent
  ],
  providers: [
    NS_ANALYTICS_PROVIDERS,
    { provide: RouterExtensions, useClass: TNSRouterExtensions }
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],  bootstrap: [NSAppComponent]
})

export class NativeModule { }
