import { Component } from '@angular/core';
import {  Router } from '@angular/router';

import { FourDInterface,  MD5 } from '../js44D/JSFourDInterface';
import { LogService } from '../../core/services/log.service';
import { Config } from '../../core/utils/config';


@Component({
    selector: 'login-ns',
    moduleId: module.id,
    templateUrl: 'loginNS.html',
    styleUrls : ['login.css']
})

export class LoginNSCmp {

    username:string = '';
    password:string = '';
    showError:string = '';
    fourDVersion:string = '';
    webAppVersion:string = Config.APP_VERSION();

    constructor(private fourD:FourDInterface, private router:Router, private log: LogService) {
        //this.log.debug("get app version");
        this.fourD.call4DRESTMethod('REST_GetApplicationVersion',{})
            .subscribe((v) => {
                //this.log.debug('ver:'+v.text());
                this.fourDVersion = v.text();
            }, err => {this.log.debug('error:'+err);});
    }

    login() {
        let md5pwd:string = MD5.md5(this.password);
        //this.log.debug('sign in:'+this.username +'/'+ md5pwd.toUpperCase());
        this.fourD.signIn(this.username, md5pwd.toUpperCase())
            .then((authentication) => {
                if (FourDInterface.authentication) {
                    //this.log.debug('authenticated');
 
                    this.showError = '';
                    this.router.navigateByUrl('/userRecommendations');

                } else {
                    this.log.debug('oops');
                    this.showError = 'Incorrect username and/or password.';
                }
            })
            .catch((e) => {
                this.log.debug('error:'+e);
                this.showError = 'error:'+e;
            });
    }
}
