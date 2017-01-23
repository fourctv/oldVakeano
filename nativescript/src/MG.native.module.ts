// nativescript
import { NativeScriptModule, NativeScriptFormsModule, NativeScriptHttpModule, NativeScriptRouterModule, RouterExtensions as TNSRouterExtensions } from 'nativescript-angular';
// import { RouterExtensions as TNSRouterExtensions } from 'nativescript-angular/router';

// angular
import { NgModule } from '@angular/core';

// plugins
import { SIDEDRAWER_DIRECTIVES } from "nativescript-telerik-ui/sidedrawer/angular";

// libs
//import { StoreModule } from '@ngrx/store';
//import { EffectsModule } from '@ngrx/effects';
//import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

// app
import { WindowService, ConsoleService, RouterExtensions } from './app/shared/core/index';
import { NSAppComponent } from './mobile/appMG/appMG.component';
import { routes } from './mobile/appMG/appMG.component';

// feature modules
import { CoreModule } from './app/shared/core/core.module';
import { JS44DModule } from './app/shared/js44D/js44D.module';
import { MGModule } from './app/shared/moviegenome/mg.module';
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

// {N} custom app specific
import { WindowNative, NSAppService } from './mobile/core/index';
import { NS_ANALYTICS_PROVIDERS } from './mobile/analytics/index';

/**
 * Config
 * Seed provided configuration options
 */
import { Config } from './app/shared/core/index';
import { Page } from 'ui/page';
Config.PageClass = Page;

// (required) platform target (allows component decorators to use the right view template)
Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_NATIVE;

// (optional) log level - defaults to no logging if not set
Config.DEBUG.LEVEL_4 = true;

// intermediate component module
// helps encapsulate custom native modules in with the components
// note: couple ways this could be done, just one option presented here...
@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    JS44DModule,
    MGModule,

  ],
  declarations: [SIDEDRAWER_DIRECTIVES,
    LoginNSCmp, SignUp,
    PreferencePanel,
    UserRecommendationPage, UserRecommendations, FeatureRecommendation, 
    UserRating, FeatureRating, ProfileBuildingPage
  ],
  entryComponents: [FeatureRecommendation, FeatureRating],
  exports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    //MultilingualModule
  ]
})
class ComponentsModule { }

// For AoT compilation to work:
export function cons() {
  return console;
}

@NgModule({
  imports: [
    CoreModule.forRoot([
      { provide: WindowService, useClass: WindowNative },
      { provide: ConsoleService, useFactory: (cons) }
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
  bootstrap: [NSAppComponent]
})

export class NativeModule { }
