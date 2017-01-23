import { Component, Input } from '@angular/core';

import { ICustomModal, ModalConfig, ICustomModalComponent, ModalDialogInstance } from '../../shared/js44D/index';

@Component({
    selector: 'userrating-dialog',
    template : '<user-rating [currentUser]="currentUser"></user-rating>'
})

export class UserRatingDialog implements ICustomModalComponent {
    public static dialogConfig: ModalConfig = <ModalConfig>{size: 'lg', 
            actions:['Maximize', 'Minimize', 'Close'], position: {top:100, left:100},selfCentered:true,
            title:'User Rating',
            isResizable:true,
            width:1160, height:800};
   
    public dialog: ModalDialogInstance;
          
    @Input() public currentUser:number;

    public set modelContentData(v:ICustomModal) {
        if (v) {
                let parms:Object = v;
                if (parms.hasOwnProperty('currentUser')) {
                    this.currentUser = parms['currentUser'];
                }
            }
    }

}
