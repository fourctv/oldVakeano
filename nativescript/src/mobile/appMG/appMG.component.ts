// angular
import { Component, Inject, ChangeDetectionStrategy} from '@angular/core';
import {  Router, Route } from '@angular/router';
import { Http } from '@angular/http';

// app
import { LogService} from '../../app/shared/core/index';
import {ActionBarUtil} from '../core/utils/actionbar.util';


import { FourDInterface } from '../../app/shared/js44D/index';
import { LoginNSCmp } from '../login/login';
import { SignUp } from '../login/signUp';

import { UserRecommendations } from '../recommendations/userRecommendations'; 
import { UserRating } from '../userrating/userRating'; 
import { UserRecommendationPage } from '../recommendations/userRecommendationPage'; 
import { ProfileBuildingPage } from '../userrating/profileBuildingPage'; 

export const routes: Route[] = [
    {path: 'login', component: LoginNSCmp},
    {path: 'signUp', component: SignUp},
    {path: 'userRating', component: UserRating},
    {path: 'userRecommendations', component: UserRecommendations},
    {path: 'userRecommendationPage', component: UserRecommendationPage},
    {path: 'profileBuildingPage', component: ProfileBuildingPage},
    {path: '**',  component: LoginNSCmp}
];


@Component({
    moduleId: module.id,
    selector: 'sd-app',
    templateUrl: 'appMG.component.html',
    styleUrls: ['appMG.component.css'],
    changeDetection: ChangeDetectionStrategy.Default 
})
export class NSAppComponent {
  
  constructor(@Inject(Router) private router:Router, @Inject(LogService) private log: LogService, @Inject(Http) private http: Http) {
    //super(analytics);
    //log.debug('MGApp ----');
    
    FourDInterface.http = <any>http;
    FourDInterface.log = log;
    //log.debug('http:'+http);

     //   FourDInterface.log = log;
    ActionBarUtil.STATUSBAR_STYLE(1);
 
 /*
    router.events.subscribe((e) => {
      this.log.debug(`Router Event: ${e.toString()}`);
    });
    */
 }
 
}
