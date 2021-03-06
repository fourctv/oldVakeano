import { Component, AfterViewInit } from '@angular/core';

import { RecordEditWindow } from '../../modules/js44D/containers/recordEditWindow';
import { ModalConfig } from '../../modules/js44D/angular2-modal/models/ModalConfig';
import { GenomeMap } from '../../modules/moviegenome/index';

@Component({
    moduleId: module.id,
    selector: 'modal-content',
    templateUrl : 'genomeMapInfoDialog.html' 
})

export class GenomeMapInfoDialog extends RecordEditWindow implements AfterViewInit {
    public static dialogConfig: ModalConfig = <ModalConfig>{
            actions:['Maximize', 'Minimize', 'Close'], position: {top:100, left:100},selfCentered:true,
            title:'Gene Details',
            isResizable:false,
            width:1000, height:500
        };
    
    currentRecord: GenomeMap;
    

    ngAfterViewInit() {
        this.dialog.setTitle('Gene Details: '+this.currentRecord.GeneName);
    }


}
