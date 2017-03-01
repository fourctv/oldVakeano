import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LogService } from '../../app/shared/core/index';
import { Config } from '../../app/shared/core/utils/config';
import { RouterExtensions } from 'nativescript-angular';
import { NavigationTransition } from 'ui/frame';

import { FourDInterface,  MD5 } from '../../app/shared/js44D/js44D/JSFourDInterface';


@Component({
    selector: 'login',
    moduleId: module.id,
    templateUrl: 'login.html',
    styleUrls : ['login.css'],
    changeDetection: ChangeDetectionStrategy.Default
})

export class LoginNSCmp {

    username:string = '';
    password:string = '';
    showError:string = '';
    fourDVersion:string = '';
    webAppVersion:string = 'v'+Config.APP_VERSION();


    constructor(private fourD:FourDInterface, private router:RouterExtensions, private log: LogService) {
        this.log.debug("get app version");
        this.fourD.call4DRESTMethod('REST_GetApplicationVersion',{})
            .subscribe((v) => {
                this.log.debug('ver:'+v.text());
                this.fourDVersion = v.text();
                this.webAppVersion += ' - v'+this.fourDVersion;
            }, err => {this.log.debug("error:"+err)});
    }

    //
    // log into Movie Genome
    //
    login() {
        let md5pwd:string = MD5.md5(this.password);
        //this.log.debug('sign in:'+this.username +'/'+ md5pwd.toUpperCase());
        this.fourD.signIn(this.username, md5pwd.toUpperCase())
            .then((authentication) => {
                if (FourDInterface.authentication) {
                    //this.log.debug('authenticated');
 
                    this.showError = '';
                    this.router.navigate(['/userRecommendationPage'], {clearHistory:true, transition:{name:'fade' }});

                } else {
                    //this.log.debug('oops');
                    this.showError = 'Incorrect username and/or password.';
                }
            })
            .catch((e) => {
                this.log.debug('error:'+e);
                this.showError = 'Incorrect username and/or password.';
            });
    }

    //
    // New user sign uo
    //
    signUp() {
        this.router.navigate(['/signUp'], { }); // go to the signUp page
        
    }

    //
    // for debugging swipe support on android
    //
    swipe(event) {
        this.log.debug('swipe:'+event.direction);
    }
}
