import { Component, Input, AfterViewInit } from '@angular/core';

import { FourDInterface } from '../../shared/js44D/js44D/JSFourDInterface';
import { TasteProfilesEx } from '../../shared/moviegenome/index';

@Component({
    moduleId: module.id,
    selector: 'userprofile-info',
    templateUrl: 'userProfileInfo.html'
})

export class UserProfileInfo implements AfterViewInit {
    @Input() public currentRecord: TasteProfilesEx;

    public generateProfileVectors() {
        if (this.currentRecord) {
            let saveCallback: string = this.currentRecord.fourdSaveCallbackMethod_;
            this.currentRecord.fourdSaveCallbackMethod_ = 'CPROGenerateFeatureProfile';
            this.currentRecord.updateRecord();
            this.currentRecord.fourdSaveCallbackMethod_ = saveCallback;
        }
    }

    ngAfterViewInit() {
        if (!this.currentRecord.isRecordLoaded()) {
            this.currentRecord.UserID = FourDInterface.currentUserID;
            this.currentRecord.UserName = FourDInterface.currentUser;
        }
    }
}
