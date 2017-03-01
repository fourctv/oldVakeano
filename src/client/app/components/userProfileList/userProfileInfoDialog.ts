import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { FourDInterface } from '../../shared/js44D/js44D/JSFourDInterface';
import { ModalConfig } from '../../shared/js44D/angular2-modal/models/ModalConfig';
import { RecordEditWindow } from '../../shared/js44D/containers/recordEditWindow';
import { TasteProfilesEx } from '../../shared/moviegenome/index';
import { ProfileGenesInfo } from './profileGenesInfo';
import { ViewerContentInfo } from './viewerContentInfo';
import { ProfileRecommendationsInfo } from './profileRecommendationsInfo';

@Component({
    moduleId: module.id,
    selector: 'modal-content',
    templateUrl: 'userProfileInfoDialog.html'
})

export class UserProfileInfoDialog extends RecordEditWindow implements AfterViewInit {
    public static dialogConfig: ModalConfig = <ModalConfig>{size: 'lg', 
            actions:['Maximize', 'Minimize', 'Close'], position: {top:100, left:100},selfCentered:true,
            title:'User Profile Details',
            isResizable:false,
            width:1000, height:700};

     currentRecord: TasteProfilesEx;

     @ViewChild(ProfileGenesInfo) profileGenesInfo:ProfileGenesInfo;
     @ViewChild(ViewerContentInfo) viewerContentInfo:ViewerContentInfo;
     @ViewChild(ProfileRecommendationsInfo) profileRecommendationsInfo:ProfileRecommendationsInfo;
    
    constructor(private elementRef: ElementRef) {super();}

    ngAfterViewInit() {
        if (this.currentRecord.isRecordLoaded()) {
            this.dialog.setTitle('Profile Details: '+this.currentRecord.Name+' for '+this.currentRecord.UserName);
        } else {
            this.dialog.setTitle('New Taste Profile for '+FourDInterface.currentUser);
        }
    }

    profileUpdated() {
        if (this.currentRecord) {
            kendo.ui.progress($(this.elementRef.nativeElement), true); // show loading progress icon
            this.currentRecord.refresh().then((rec)=>{
                kendo.ui.progress($(this.elementRef.nativeElement), false); // hide loading progress icon
                if (this.profileGenesInfo) this.profileGenesInfo.refreshGrid();
                if (this.viewerContentInfo) this.viewerContentInfo.refreshGrid();
                if (this.profileRecommendationsInfo) this.profileRecommendationsInfo.refreshGrid();
            });
        }
   }
}
