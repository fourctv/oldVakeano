import { Component, Input } from '@angular/core';

import { ICustomModal, ICustomModalComponent } from '../../shared/js44D/angular2-modal/models/ICustomModal';
import { ModalConfig } from '../../shared/js44D/angular2-modal/models/ModalConfig';
import { ModalDialogInstance } from '../../shared/js44D/angular2-modal/models/ModalDialogInstance';

@Component({
    selector: 'userrecommendations-dialog',
    template : '<user-recommendations [profileID]="profileID" [profileName]="profileName"></user-recommendations>'
})

export class UserRecommendationsDialog implements ICustomModalComponent {
    public static dialogConfig: ModalConfig = <ModalConfig>{size: 'lg', 
            actions:['Maximize', 'Minimize', 'Close'], position: {top:100, left:100},selfCentered:true,
            title:'User Recommendations',
            isResizable:true,
            width:1160, height:800};
    
    public dialog: ModalDialogInstance;
         
    @Input() public profileID:number;
    @Input() public profileName:string;

    public set modelContentData(v:ICustomModal) {
        if (v) {
            let parms:Object = v;
            if (parms.hasOwnProperty('profileID')) {
                this.profileID = parms['profileID'];
                this.profileName = parms['profileName'];
                }
            }
    }

}
