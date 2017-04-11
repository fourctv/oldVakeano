import { Component,  ElementRef, ViewContainerRef, AfterContentInit,
    SystemJsNgModuleLoader, Compiler, Inject } from '@angular/core';
import { Http } from '@angular/http';
// any operators needed throughout your application
import '../operators';

import { LogService } from '../../shared/core/services/logging/log.service';
import { Config } from '../../shared/core/utils/config';

import { JSAppLoader } from '../../shared/js44D/services/jsapploader';
import { LoginCmp } from '../../shared/js44D/login/login';
import { Modal } from '../../shared/js44D/angular2-modal/providers/modal';
import { FourDInterface } from '../../shared/js44D/js44D/JSFourDInterface';


@Component({
    moduleId: module.id,
    selector: 'sd-app',
    providers: [Modal, FourDInterface, SystemJsNgModuleLoader],
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})


export class AppComponent implements AfterContentInit {
    public static MAIN_APP_VERSION = '';

    public menuList = [
        {
            modulePath: 'app/components/userRating/',
            moduleFile: 'userRatingModule.js',
            moduleName: 'UserRatingModule',
            componentName: 'UserRating',
            roles: ['Viewer', 'Admin'],
            hideMenu: false,
            title: 'User Rating'
        },
        {
            modulePath: 'app/components/userRecommendations/',
            moduleFile: 'userRecommendationsModule.js',
            moduleName: 'UserRecommendationsModule',
            componentName: 'UserRecommendations',
            roles: ['Viewer', 'Admin'],
            hideMenu: false,
            title: 'User Recommendations'
        },
        {
            modulePath: 'app/components/featureList/',
            moduleFile: 'featureListModule.js',
            moduleName: 'FeatureListModule',
            componentName: 'FeatureListApp',
            roles: ['Curator', 'Admin'],
            hideMenu: false,
            title: 'Features'
        },
        {
            modulePath: 'app/components/userProfileList/',
            moduleFile: 'userProfileListModule.js',
            moduleName: 'UserProfileListModule',
            componentName: 'UserProfileListApp',
            roles: ['Admin'],
            hideMenu: false,
            title: 'Taste Profiles'
        },
        {
            modulePath: 'app/components/genomeMapList/',
            moduleFile: 'genomeMapListModule.js',
            moduleName: 'GenomeMapListModule',
            componentName: 'GenomeMapListApp',
            roles: ['Admin'],
            hideMenu: false,
            title: 'Genome Map'
        }
    ];

    public get currentUser(): string {
        return (FourDInterface.authentication) ? FourDInterface.currentUser : '?';
    }

    private urlSearchParms: Object = {};
    constructor(private logger: LogService, 
                private modal: Modal, 
                private elementRef: ElementRef, 
                private viewref: ViewContainerRef , 
                private http:Http, 
                private fourD:FourDInterface,
                private loader:SystemJsNgModuleLoader,
                private compiler:Compiler) {
        
        AppComponent.MAIN_APP_VERSION = Config.APP_VERSION();
        let url = window.location.search.substr(1); // get incoming url and parse search params
        url.split('&').forEach(element => {
            let item = element.split('=');
            if (item.length === 2) {
                this.urlSearchParms[item[0]] = decodeURIComponent(item[1]);
            } else {
                this.urlSearchParms[element] = true;
            }
        });

        FourDInterface.http = http;
        FourDInterface.log = logger;
    }

    userHasLoggedIn() {
        // load current profile user functions
        if (this.userIsLoggedIn) {
            FourDInterface.runningInsideWorkspace = true; // we are indeed running inside the workspace

            // now we need to check user Roles and enable/disable menus accordingly
            if (FourDInterface.authentication.options._isAdmin !== 'yes') {
                this.menuList.forEach(element => {
                    element.hideMenu = !this.userHasAccess(element.roles);
                });

            }

            if (this.urlSearchParms.hasOwnProperty('app')) {
                let app = this.urlSearchParms['app'].toLowerCase();
                this.menuList.forEach(element => {
                    if (element.componentName.toLowerCase() === app && !element.hideMenu) this.openJSApp(element);
                });
            }

            /*            
                  $('#main-app-menu').kendoContextMenu({
                                target: '#main-app-menu-target',
                                showOn: 'click',
                                alignToAnchor: false
                            });
            */
        }

    }


    get userIsLoggedIn(): boolean { return FourDInterface.authentication !== undefined && FourDInterface.authentication !== null; }

    doLogin() {
        FourDInterface.authentication = null;
        this.showLoginDialog();
    }


    openJSApp(menu) {
        if (FourDInterface.authentication) {
            kendo.ui.progress($(this.elementRef.nativeElement), true); // show loading progress icon

            let path = menu.modulePath + menu.moduleFile + '#' + menu.moduleName; // path to the module
            if (String('<%= BUILD_TYPE %>')=== 'prod') {
                path = 'js/' + menu.moduleFile + '#' + menu.moduleName; // adjsut module path for production
            }

            this.loader.load(path)
            .then ((modFac) => {
                kendo.ui.progress($(this.elementRef.nativeElement), false); // hide loading progress icon="res://"
                this.compiler.compileModuleAndAllComponentsAsync<any>(modFac.moduleType)
                    .then((factory) => {
                        let cmpFactory: any;
                        for (let i = factory.componentFactories.length - 1; i >= 0; i--) {
                            if (factory.componentFactories[i].componentType['name'] === menu.componentName) {
                                cmpFactory = factory.componentFactories[i];
                            }
                        }
                        return cmpFactory;
                        })
                    .then(cmpFactory => { 
                        let modRef = modFac.create(this.viewref.parentInjector);
                        kendo.ui.progress($(this.elementRef.nativeElement), false); // hide loading progress icon
                            this.modal.openDialog(JSAppLoader, { title: menu.title, provider: cmpFactory, injector: modRef });
                    });

            });

            
        }
    }

    showLoginDialog() {
        this.modal.openInside(<any>LoginCmp, this.viewref, null, LoginCmp.dialogConfig)
            .then((result) => {
                    this.userHasLoggedIn();
            });        
    }

    ngAfterContentInit() {
        if (this.urlSearchParms.hasOwnProperty('key')) {
            try {
                /*
                let key = JSON.parse(atob(this.urlSearchParms['key']));
                this.FourDInterface.signIn(key.username, key.password)
                    .then((authentication) => {
                        if (FourDInterface.authentication) {
                            this.userHasLoggedIn();
                        }
                    })
                    .catch(e => { this.showLoginDialog(); });
                    */
            } catch (error) {
                this.showLoginDialog();
            }
        } else {
            // no predefined user, login...
            this.showLoginDialog();
        }
    }

    userHasAccess(roles: Array<string>): boolean {

        let found: boolean = false;
        roles.forEach((role) => {
            if (FourDInterface.authentication.groups.findIndex((value) => { return value === role; }) >= 0) found = true;
        });
        return found;
    }
}
