import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { Http } from '@angular/http';
// any operators needed throughout your application
import '../operators';

import { LogService } from '../../shared/core/services/log.service';
import { Config } from '../../shared/core/utils/config';

import { LoginNSCmp,  FourDInterface } from '../../shared/js44D/index';

import { UserRating } from '../userRating/userRating'; 
import { UserRecommendations } from '../userRecommendations/userRecommendations'; 
import { FeatureListApp } from '../featureList/featureList'; 
import { UserProfileListApp } from '../userProfileList/userProfileList'; 
import { GenomeMapListApp } from '../genomeMapList/genomeMapList'; 

export const routes: Routes = [
    {path: 'login', component: LoginNSCmp},
    {path: 'userRating', component: UserRating},
    {path: 'features', component: FeatureListApp},
    {path: 'profiles', component: UserProfileListApp},
    {path: 'genomeMap', component: GenomeMapListApp},
    {path: 'userRecommendations', component: UserRecommendations},
    {path: '**',  component: LoginNSCmp}
];


@Component({
    moduleId: module.id,
    selector: 'sd-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
})


export class AppComponent implements OnInit {
    public static MAIN_APP_VERSION = '';
 
    public get currentUser(): string {
        return (FourDInterface.authentication) ? FourDInterface.currentUser : '?';
    }

    constructor (public router:Router, private http:Http, private logger: LogService) {
        FourDInterface.http = http;
        FourDInterface.log = logger;
        AppComponent.MAIN_APP_VERSION = Config.APP_VERSION();
    }
    
    ngOnInit() {
       this.router.navigate(['login']);
    }
    
    userHasLoggedIn() {
        // load current profile user functions
        if (this.userIsLoggedIn) {
            FourDInterface.runningInsideWorkspace = true; // we are indeed running inside the workspace
        }

    }


    get userIsLoggedIn(): boolean { return FourDInterface.authentication !== undefined && FourDInterface.authentication !== null; }
}
