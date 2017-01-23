// angular
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
//import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule }      from '@angular/common';

// The browser platform with a compiler
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

// app
import { UserRatingModule } from './app/components/userRating/userRatingModule';
import { UserRating } from './app/components/userRating/userRating';

// feature modules
import { CoreModule } from './app/shared/core/core.module';
import { JS44DModule } from './app/shared/js44D/js44D.module';
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

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule.forRoot([
      { provide: WindowService, useValue: window },
      { provide: ConsoleService, useValue: console }
    ]),
    //routerModule,
      CommonModule,
      JS44DModule,
      MGModule,
      UserRatingModule
  ],
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

  bootstrap: [UserRating]
})

export class WebModule { }

platformBrowserDynamic().bootstrapModule(WebModule);
