// angular
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
//import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule }      from '@angular/common';

// The browser platform with a compiler
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

// libs
//import { StoreModule } from '@ngrx/store';
//import { EffectsModule } from '@ngrx/effects';
//import { StoreDevtoolsModule } from '@ngrx/store-devtools';
//import { TranslateLoader } from 'ng2-translate';
import { FourDInterface } from './app/shared/js44D/js44D/JSFourDInterface';
import { FourDModel } from './app/shared/js44D/js44D/JSFourDModel';
import { FourDCollection } from './app/shared/js44D/js44D/JSFourDCollection';

// app
import { UserRatingModule } from './app/components/userRating/userRatingModule';
import { UserRating } from './app/components/userRating/userRating';

// feature modules
import { CoreModule } from './app/shared/core/core.module';
import { JS44DModule } from './app/shared/js44D/js44D.module';
import { ModalModule } from './app/shared/js44D/modal.module';
import { MGModule } from './app/shared/moviegenome/mg.module';

// config
import { Config, WindowService, ConsoleService } from './app/shared/core/index';
Config.PLATFORM_TARGET = Config.PLATFORMS.WEB;

//let routerModule = RouterModule.forRoot(routes);

if (String('<%= TARGET_DESKTOP %>') === 'true') {
  Config.PLATFORM_TARGET = Config.PLATFORMS.DESKTOP;
  // desktop (electron) must use hash
  //routerModule = RouterModule.forRoot(routes, {useHash: true});
}

declare var window, console;

// For AoT compilation to work:
export function win() {
  return window;
}
export function cons() {
  return console;
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
    CoreModule.forRoot([
      { provide: WindowService, useValue: (win) },
      { provide: ConsoleService, useValue: (cons) }
    ]),
    //routerModule,
      CommonModule,
      JS44DModule, ModalModule,
      MGModule,
      UserRatingModule
  ],
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

  bootstrap: [UserRating]
})

export class WebModule { }

platformBrowserDynamic().bootstrapModule(WebModule);
