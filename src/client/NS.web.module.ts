// angular
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule }      from '@angular/common';

// libs
//import { StoreModule } from '@ngrx/store';
//import { EffectsModule } from '@ngrx/effects';
//import { StoreDevtoolsModule } from '@ngrx/store-devtools';
//import { TranslateLoader } from 'ng2-translate';
import { FourDInterface } from './app/modules/js44D/js44D/JSFourDInterface';
import { FourDModel } from './app/modules/js44D/js44D/JSFourDModel';
import { FourDCollection } from './app/modules/js44D/js44D/JSFourDCollection';

// app
import { AppComponent } from './app/components/appNS/app.component';
import { routes } from './app/components/appNS/app.component';

// feature modules
import { CoreModule } from './app/modules/core/core.module';
import { JS44DModule } from './app/modules/js44D/js44D.module';
import { ModalModule } from './app/modules/js44D/modal.module';
import { MGModule } from './app/modules/moviegenome/mg.module';

// applets
import { BlankPage } from './app/components/appNS/blankPage';
import { UserRatingModule } from './app/components/userRating/userRatingModule'; 
import { UserRecommendationsModule } from './app/components/userRecommendations/userRecommendationsModule'; 
import { FeatureListModule } from './app/components/featureList/featureListModule'; 
import { UserProfileListModule } from './app/components/userProfileList/userProfileListModule'; 
import { GenomeMapListModule } from './app/components/genomeMapList/genomeMapListModule'; 

// config
import { Config, WindowService, ConsoleService, createConsoleTarget, provideConsoleTarget, LogTarget, LogLevel, ConsoleTarget } from './app/modules/core/index';
Config.PLATFORM_TARGET = Config.PLATFORMS.WEB;
if (String('<%= BUILD_TYPE %>') === 'dev') {
  // only output console logging in dev mode
  Config.DEBUG.LEVEL_4 = true;
}

let routerModule = RouterModule.forRoot(routes);

if (String('<%= TARGET_DESKTOP %>') === 'true') {
  Config.PLATFORM_TARGET = Config.PLATFORMS.DESKTOP;
  // desktop (electron) must use hash
  routerModule = RouterModule.forRoot(routes, { useHash: true });
}

declare var window, console;

// For AoT compilation to work:
export function win() {
  return window;
}
export function cons() {
  return console;
}

export function consoleLogTarget(consoleService: ConsoleService) {
  return new ConsoleTarget(consoleService, { minLogLevel: LogLevel.Debug });
}

let DEV_IMPORTS: any[] = [];

if (String('<%= BUILD_TYPE %>') === 'dev') {
  DEV_IMPORTS = [
    ...DEV_IMPORTS,
    //StoreDevtoolsModule.instrumentOnlyWithExtension()
  ];
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    CoreModule.forRoot([
      { provide: WindowService, useFactory: (win) },
      { provide: ConsoleService, useFactory: (cons) },
      { provide: LogTarget, useFactory: (consoleLogTarget), deps: [ConsoleService], multi: true }
    ]),
    routerModule,
    JS44DModule, ModalModule,
    MGModule,
    UserRatingModule,
    UserRecommendationsModule,
    UserProfileListModule,
    FeatureListModule,
    GenomeMapListModule

  ],
  declarations: [AppComponent, BlankPage],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '<%= APP_BASE %>'
    }, FourDInterface, FourDModel, FourDCollection
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
