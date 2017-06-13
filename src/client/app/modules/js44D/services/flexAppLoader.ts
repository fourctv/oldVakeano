import { Component, AfterViewInit } from '@angular/core';

import {ModalDialogInstance} from '../angular2-modal/models/ModalDialogInstance';
import {ModalConfig} from '../angular2-modal/models/ModalConfig';
import { ICustomModal } from '../angular2-modal/models/ICustomModal';
import { ICustomModalComponent } from '../angular2-modal/models/ICustomModalComponent';

import { fourDUrl, FourDInterface } from '../js44D/JSFourDInterface';

@Component({
    selector: 'flexapp-loader',
    template: `
        <section class="webComponent">
            
            <div>
                <iframe src="about:blank" style="width:100%;height:100%;position:absolute"></iframe>
            </div>
        </section>
    `
})

export class FlexAppLoader implements ICustomModalComponent, AfterViewInit {
    public static dialogConfig: ModalConfig = <ModalConfig>{size: 'lg', 
            actions:['Maximize', 'Minimize', 'Close'], position: {top:50, left:50},selfCentered:true,
            width:1000, height:800};
    
    public dialog: ModalDialogInstance;
    public webApp:any;
 
    private theIFrame: any;

    constructor(dialog: ModalDialogInstance, modelContentData: ICustomModal, private fourD:FourDInterface) {
        this.dialog = dialog;
        this.webApp = modelContentData;
     }

    
    ngAfterViewInit() {
        this.theIFrame = this.dialog.contentRef.location.nativeElement.getElementsByTagName('iframe');
        this.doLoad(this.webApp.WebModule);
        this.dialog.setTitle(this.webApp.Function);
    }

    doLoad(webApp:string) {
        if (webApp) {
            //console.log(this.theIFrame);
            let webAppUrl = fourDUrl + '/' + webApp + '.swf';
            let key: string = '<key username="' + FourDInterface.currentUser + '" password="' + FourDInterface.currentUserPassword + '" profile="' + FourDInterface.authentication.options.defaultProfile + '"/>';
            webAppUrl += '?key=' + btoa(key);
            $(this.theIFrame).attr('src', webAppUrl);
        }
    }

}

