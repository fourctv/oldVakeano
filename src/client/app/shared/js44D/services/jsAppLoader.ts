import { Component, ComponentFactoryResolver, ElementRef, ViewContainerRef, AfterViewInit } from '@angular/core';

import {ModalDialogInstance} from '../angular2-modal/models/ModalDialogInstance';
import {ModalConfig} from '../angular2-modal/models/ModalConfig';
import {ICustomModal, ICustomModalComponent} from '../angular2-modal/models/ICustomModal';

@Component({
    selector: 'jsapp-loader',
    template: `<span #content><span>`
})

export class JSAppLoader implements ICustomModalComponent, AfterViewInit {
    public static dialogConfig: ModalConfig = <ModalConfig>{size: 'lg', 
            actions:['Maximize', 'Minimize', 'Close'], position: {top:50, left:50},selfCentered:true,
            width:1200, height:800};
    
    public webApp:any;

    constructor(
        public el: ElementRef,
        public componentFactoryResolver: ComponentFactoryResolver,
        public dialog: ModalDialogInstance,
        private viewRef:ViewContainerRef) {
            }

    public set modelContentData(v:ICustomModal) {
        this.webApp = v;
    }

    ngAfterViewInit() {
        this.dialog.setTitle(this.webApp.title);
        let compRef = this.viewRef.createComponent(this.webApp.provider,0,this.webApp.injector);
        compRef.changeDetectorRef.detectChanges();
        let kwindow = $(this.el.nativeElement).data('kendoWindow');
        if (compRef.instance.hasOwnProperty('mdiWindowConfig')) {
            // web app has a window configuration
                kwindow.setOptions(compRef.instance['mdiWindowConfig']);
        }
          
    }

}

