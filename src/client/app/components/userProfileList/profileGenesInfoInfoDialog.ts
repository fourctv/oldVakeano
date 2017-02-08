import { Component, AfterViewInit } from '@angular/core';

import { RecordEditWindow,  ModalConfig } from '../../shared/js44D/index';

import { ProfileGenesEx } from '../../shared/moviegenome/index';


@Component({
    moduleId: module.id,
    selector: 'profile-genes',
    templateUrl : 'profileGenesInfoDialog.html'
})

export class ProfileGenesInfoDialog extends RecordEditWindow implements AfterViewInit {
    public static dialogConfig: ModalConfig = <ModalConfig>{
            actions:['Maximize', 'Minimize', 'Close'], position: {top:50, left:50},selfCentered:true,
            title:'Profile Gene Details',
            isResizable:false,
            width:800, height:320
        };

     currentRecord: ProfileGenesEx;


    ngAfterViewInit() {
        this.dialog.setTitle('Profile Gene: '+this.currentRecord.GeneName);
    }

}
