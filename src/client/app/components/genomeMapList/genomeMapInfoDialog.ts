import { Component, AfterViewInit } from '@angular/core';

import { RecordEditWindow,  ModalConfig } from '../../shared/js44D/index';
import { GenomeMap } from '../../shared/moviegenome/index';

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
