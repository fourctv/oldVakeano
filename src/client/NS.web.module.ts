// angular
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule }      from '@angular/common';

// libs
//import { StoreModule } from '@ngrx/store';
//import { EffectsModule } from '@ngrx/effects';
//import { StoreDevtoolsModule } from '@ngrx/store-devtools';
//import { TranslateLoader } from 'ng2-translate';

// app
import { AppComponent } from './app/components/appNS/app.component';
import { routes } from './app/components/appNS/app.component';

// feature modules
import { CoreModule } from './app/shared/core/core.module';
import { JS44DModule } from './app/shared/js44D/js44D.module';
import { MGModule } from './app/shared/moviegenome/mg.module';

// login component
import { LoginNSCmp } from './app/shared/js44D/login/loginNS';

// applets
import { UserRatingModule } from './app/components/userRating/userRatingModule'; 
import { UserRecommendationsModule } from './app/components/userRecommendations/userRecommendationsModule'; 
import { FeatureListModule } from './app/components/featureList/featureListModule'; 
import { UserProfileListModule } from './app/components/userProfileList/userProfileListModule'; 
import { GenomeMapListModule } from './app/components/genomeMapList/genomeMapListModule'; 

// config
import { Config, WindowService, ConsoleService } from './app/shared/core/index';
Config.PLATFORM_TARGET = Config.PLATFORMS.WEB;
if (String('<%= BUILD_TYPE %>') === 'dev') {
  // only output console logging in dev mode
  Config.DEBUG.LEVEL_4 = true;
}

let routerModule = RouterModule.forRoot(routes);

if (String('<%= TARGET_DESKTOP %>') === 'true') {
  Config.PLATFORM_TARGET = Config.PLATFORMS.DESKTOP;
  // desktop (electron) must use hash
  routerModule = RouterModule.forRoot(routes, {useHash: true});
}

declare var window, console;

// For AoT compilation to work:
export function win() {
  return window;
}
export function cons() {
  return console;
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    CoreModule.forRoot([
      { provide: WindowService, useFactory: (win) },
      { provide: ConsoleService, useFactory: (cons) }
    ]),
    routerModule,
    JS44DModule,
    MGModule,
    UserRatingModule,
    UserRecommendationsModule,
    UserProfileListModule,
    FeatureListModule,
    GenomeMapListModule

  ],
  declarations: [AppComponent, LoginNSCmp],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '<%= APP_BASE %>'
    }, 
 ],
  exports: [
      FormsModule, 
      CommonModule,
      JS44DModule,
      MGModule
      ],
      
  bootstrap: [AppComponent]
})

export class WebModule {}