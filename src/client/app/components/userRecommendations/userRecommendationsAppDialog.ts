import { Component, ContentChild, ElementRef, ViewContainerRef, AfterContentInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ModalConfig } from '../../modules/js44D/angular2-modal/models/ModalConfig';
import { Modal } from '../../modules/js44D/angular2-modal/providers/Modal';
import { ICustomModalComponent } from '../../modules/js44D/angular2-modal/models/ICustomModalComponent';

import { UserRecommendations } from './userRecommendations'

@Component({
    selector: 'recommendations-dialog',
    template: '<div></div>',
    providers: [Modal]
})

export class UserRecommendationsAppDialog implements AfterContentInit {
    constructor(private modal: Modal, public router:Router, private elementRef: ElementRef, private viewRef:ViewContainerRef) {
    }
    
    /**
     * Declare the dialog configuration
     */
    private dialogConfig: ModalConfig = <ModalConfig>{size: 'lg', 
            selfCentered:true,
            title:'User Recommendations',
            width:1200, height:1000};
    /**
     * AFter our view gets initialized, subscribe to various events on the Query band and the Grid
     */
    ngAfterContentInit() {
        this.router.navigate(['/blank'], { skipLocationChange: true });
        this.modal.open(UserRecommendations, {}, this.dialogConfig, false, 'userRecommendations'); // open web app dialog window
    }
}
