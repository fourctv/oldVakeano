import { Component, Input } from '@angular/core';

import { ICustomModal } from '../../shared/js44D/angular2-modal/models/ICustomModal';
import { ICustomModalComponent } from '../../shared/js44D/angular2-modal/models/ICustomModalComponent';
import { ModalConfig } from '../../shared/js44D/angular2-modal/models/ModalConfig';
import { ModalDialogInstance } from '../../shared/js44D/angular2-modal/models/ModalDialogInstance';

@Component({
    selector: 'userrating-dialog',
    template : '<user-rating [currentUser]="currentUser" [currentProfile]="currentProfile"></user-rating>'
})

export class UserRatingDialog implements ICustomModalComponent {
    public static dialogConfig: ModalConfig = <ModalConfig>{size: 'lg', 
            actions:['Maximize', 'Minimize', 'Close'], position: {top:100, left:100},selfCentered:true,
            title:'User Rating',
            isResizable:true,
            width:1160, height:800};
   
    public dialog: ModalDialogInstance;
          
    @Input() public currentUser:number = 0;
    @Input() public currentProfile:number = 0;

    public set modelContentData(v:ICustomModal) {
        if (v) {
                let parms:Object = v;
                if (parms.hasOwnProperty('currentUser')) {
                    this.currentUser = parms['currentUser'];
                }
                if (parms.hasOwnProperty('currentProfile')) {
                    this.currentProfile = parms['currentProfile'];
                }
            }
    }

}
