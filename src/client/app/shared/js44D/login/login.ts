import { Component } from '@angular/core';
import { Config } from '../../core/utils/config';

import { ModalConfig, ModalDialogInstance, ICustomModalComponent } from '../angular2-modal/index';

import { FourDInterface, MD5 } from '../index';


@Component({
    selector: 'login',
    moduleId: module.id,
    templateUrl: 'login.html',
    styleUrls : ['login.css']
})
export class LoginCmp implements ICustomModalComponent {
    public static dialogConfig: ModalConfig = <ModalConfig>{size: 'sm', 
            selfCentered:true,
            isResizable: false,
            isModal: true,
            isBlocking: true,
            title:'Login',
            width:1063, height:667};
    dialog: ModalDialogInstance;

    username:string = '';
    password:string = '';
    showError:boolean = false;
    fourDVersion:string = '';
    webAppVersion:string = Config.APP_VERSION();

    constructor(_dialog: ModalDialogInstance, private fourD:FourDInterface) {
        this.dialog = _dialog;
        this.fourD.call4DRESTMethod('REST_GetApplicationVersion',{})
            .subscribe((v) => {this.fourDVersion = v.text();});
    }

    login() {
        event.preventDefault();
        let md5pwd:string = MD5.md5(this.password);
        this.fourD.signIn(this.username, md5pwd.toUpperCase())
            .then((authentication) => {
                if (FourDInterface.authentication) {
                    //console.log('authenticated');
 
                    this.showError = false;
                     this.dialog.close('loggedin');
                } else {
                    console.log('oops');
                    this.showError = true;
                }
            })
            .catch((e) => {
                console.log(e);
                this.showError = true;
            });
    }
}
