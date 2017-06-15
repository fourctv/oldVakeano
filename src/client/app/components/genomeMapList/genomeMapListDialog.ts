import { Component, ContentChild, ElementRef, ViewContainerRef, AfterContentInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ModalConfig } from '../../modules/js44D/angular2-modal/models/ModalConfig';
import { Modal } from '../../modules/js44D/angular2-modal/providers/Modal';
import { ICustomModalComponent } from '../../modules/js44D/angular2-modal/models/ICustomModalComponent';

import { GenomeMapListApp } from './genomeMapList'

@Component({
    selector: 'genomemap-list-dialog',
    template: '<div></div>',
    providers: [Modal]
})

export class GenomeMapListDialog implements AfterContentInit {
    constructor(private modal: Modal, public router:Router, private elementRef: ElementRef, private viewRef:ViewContainerRef) {
    }
    
    /**
     * Declare the dialog configuration
     */
    private dialogConfig: ModalConfig = <ModalConfig>{size: 'lg', 
            actions:['Maximize', 'Minimize', 'Close'],
            selfCentered:true,
            title:'Genome Map',
            width:1200, height:800};
    /**
     * AFter our view gets initialized, subscribe to various events on the Query band and the Grid
     */
    ngAfterContentInit() {
        this.router.navigate(['/blank'], { skipLocationChange: true });
        this.modal.open(GenomeMapListApp, {}, this.dialogConfig, false, 'genomeMapList'); // open web app dialog window
    }
}
