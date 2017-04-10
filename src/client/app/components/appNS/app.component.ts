import { Component, AfterContentInit, ViewContainerRef} from '@angular/core';
import { Routes, Router } from '@angular/router';
import { Http } from '@angular/http';
// any operators needed throughout your application
import '../operators';

import { LogService } from '../../shared/core/services/log.service';
import { Config } from '../../shared/core/utils/config';

import { LoginCmp } from '../../shared/js44D/login/login';
import { Modal } from '../../shared/js44D/angular2-modal/providers/modal';
import { FourDInterface } from '../../shared/js44D/js44D/JSFourDInterface';

import { BlankPage } from './blankPage';
import { UserRating } from '../userRating/userRating'; 
import { UserRecommendations } from '../userRecommendations/userRecommendations'; 
import { FeatureListApp } from '../featureList/featureList'; 
import { UserProfileListApp } from '../userProfileList/userProfileList'; 
import { GenomeMapListApp } from '../genomeMapList/genomeMapList'; 

export const routes: Routes = [
    {path: 'login', component: BlankPage},
    {path: 'userRating', component: UserRating},
    {path: 'featureList', component: FeatureListApp},
    {path: 'userProfileList', component: UserProfileListApp},
    {path: 'genomeMapList', component: GenomeMapListApp},
    {path: 'userRecommendations', component: UserRecommendations},
    {path: '**',  component: BlankPage}
];


@Component({
    moduleId: module.id,
    selector: 'sd-app',
    providers: [ Modal, FourDInterface ],
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})


export class AppComponent implements AfterContentInit {
    public static MAIN_APP_VERSION = '';
    public menuList = [
        {
            routePath: '/userRating',
            roles: ['Viewer', 'Admin'],
            hideMenu: false,
            title: 'User Rating'
        },
        {
            routePath: '/userRecommendations',
            roles: ['Viewer', 'Admin'],
            hideMenu: false,
            title: 'User Recommendations'
        },
        {
            routePath: '/featureList',
            roles: ['Curator', 'Admin'],
            hideMenu: false,
            title: 'Features'
        },
        {
            routePath: '/userProfileList',
            roles: ['Admin'],
            hideMenu: false,
            title: 'Taste Profiles'
        },
        {
            routePath: '/genomeMapList',
            roles: ['Admin'],
            hideMenu: false,
            title: 'Genome Map'
        }
    ];

    public get currentUser(): string {
        return (FourDInterface.authentication) ? FourDInterface.currentUser : '?';
    }

    constructor (public router:Router, private http:Http, private logger: LogService, private modal: Modal, private viewref: ViewContainerRef) {
        FourDInterface.http = http;
        FourDInterface.log = logger;
        AppComponent.MAIN_APP_VERSION = Config.APP_VERSION();
    }
    ngAfterContentInit() {
             // no predefined user, login...
            this.showLoginDialog();
    }
    
    userHasLoggedIn() {
        // load current profile user functions
        if (this.userIsLoggedIn) {
            FourDInterface.runningInsideWorkspace = true; // we are indeed running inside the workspace
 
            // now we need to check user Roles and enable/disable menus accordingly
            if (FourDInterface.authentication.options.isAdmin !== 'true') {
                this.menuList.forEach(element => {
                    element.hideMenu = !this.userHasAccess(element.roles);
                });
                this.router.navigate(['/userRecommendations'], { skipLocationChange: true });
            } else {
                 this.menuList.forEach(element => {
                    element.hideMenu = false;
                });               
            }
       }

    }


    get userIsLoggedIn(): boolean { return FourDInterface.authentication !== undefined && FourDInterface.authentication !== null; }

    doLogin() {
        FourDInterface.authentication = null;
        this.router.navigate(['/login'], { skipLocationChange: true });
        this.showLoginDialog();
    }

    showLoginDialog() {
        this.modal.openInside(<any>LoginCmp, this.viewref, null, LoginCmp.dialogConfig)
            .then((result) => {
                    this.userHasLoggedIn();
            });        
    }

    userHasAccess(roles: Array<string>): boolean {

        let found: boolean = false;
        roles.forEach((role) => {
            if (FourDInterface.authentication.groups.findIndex((value) => { return value === role; }) >= 0) found = true;
        });
        return found;
    }

    openApp(menu) {
       if (FourDInterface.authentication) {
           this.router.navigate([menu.routePath], { skipLocationChange: true });
       }
    }
}
