import { Component, Input } from '@angular/core';

import { ModalDialogInstance, ICustomModal, ICustomModalComponent, FourDModel } from '../index';

@Component({
    selector: 'record-edit-window',
    template: ''
})

export class RecordEditWindow implements ICustomModalComponent {

    @Input() public currentRecord: FourDModel;


    public dialog: ModalDialogInstance;


    public set modelContentData(v:ICustomModal) {
        this.currentRecord = <FourDModel>v;
    }

    saveRecord() {
        if (this.currentRecord.isRecordLoaded()) {
            this.currentRecord.updateRecord()
            .then(()=> {this.dialog.close('recordSaved');})
            .catch((reason) => {  alert(reason); });
        } else {
              this.currentRecord.insertRecord()
            .then((recnum)=> {this.dialog.close('recordSaved');})
            .catch((reason) => {  alert(reason); });
      };
    }

}
