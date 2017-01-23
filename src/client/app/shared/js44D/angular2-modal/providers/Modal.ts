import {Type,
    ComponentFactoryResolver,
    ViewContainerRef,
    Injectable,
    Optional
} from '@angular/core';


import {ModalConfig} from '../models/ModalConfig';
import {ModalDialogInstance} from '../models/ModalDialogInstance';


let _config: ModalConfig;

@Injectable()
export class Modal {
 
    private theDialog:any;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ViewContainerRef,
                @Optional() defaultConfig: ModalConfig) {
        // The Modal class should be an application wide service (i.e: singleton).
        // This will run once in most applications...
        // If the user provides a ModalConfig instance to the DI,
        // the custom config will be the default one.
        _config = (defaultConfig) ? ModalConfig.makeValid(defaultConfig) : new ModalConfig();
    }

    /**
     * Opens a modal window blocking the whole screen.
     * @param componentType The angular Component to render as modal.
     * @param bindings Resolved providers that will inject into the component provided.
     * @param config A Modal Configuration object.
     * @returns {Promise<ModalDialogInstance>}
     */
    public open(componentType: any, parameters?: any,
                config?: ModalConfig): Promise<string> {
        // TODO: appRef.injector.get(APP_COMPONENT) Doesn't work.
        // When it does replace with the hack below.
        //let viewRef = this.appRef.element.nativeElement.location;
        //let viewRef: viewRef = this.appRef['_rootComponents'][0].location;

        return this.openInside(componentType, this.appRef, parameters, config);
    }

    /**
     * Opens a modal window inside an existing component.
     * @param componentType The angular Component to render as modal.
     * @param viewRef The element to block using the modal.
     * @param anchorName A template variable within the component.
     * @param bindings Resolved providers that will inject into the component provided.
     * @param config A Modal Configuration object.
     * @returns {Promise<ModalDialogInstance>}
     */
    public openInside(componentType: Type<any>, viewRef: ViewContainerRef,
                      parameters: any,
                      config?: ModalConfig): Promise<string> {

        config = (config) ? ModalConfig.makeValid(config, _config) : _config;

        let dialogComponentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        let dialogComponentRef = viewRef.createComponent(dialogComponentFactory);
        let dialogInstance = dialogComponentRef.instance.dialog = new ModalDialogInstance();
        dialogComponentRef.instance.modelContentData = parameters;

        let me = this;
        me.theDialog = $(dialogComponentRef.location.nativeElement).kendoWindow({
            actions: config.actions,
            title: config.title,
            width: config.width,
            minWidth: config.minWidth,
            height: config.height,
            minHeight: config.minHeight,
            position: config.position,
            draggable: config.isDraggable,
            modal: config.isModal,
            pinned: false,
            resizable: config.isResizable,
            close: function (event) { me.closeDialog(event, me.theDialog);}
            }).data('kendoWindow');
        if (config.selfCentered) {
            me.theDialog.center().open(); 
        } else me.theDialog.open(); 
        
        dialogInstance.contentRef = dialogComponentRef;
        
        // trick to avoid angular2 error "Expression has changed after it was checked"
        dialogComponentRef.changeDetectorRef.detectChanges(); // need this to avoid NG2 error/warning

        return dialogInstance.result;


         
/*
        let dialogBindings = Injector.resolve([ provide(ModalDialogInstance, {useValue: dialog}) ]);
        return this.createBackdrop(viewRef, dialogBindings, anchorName)
            .then( (backdropRef: ComponentRef) => {
                dialog.backdropRef = backdropRef;

                let modalDataBindings = Injector.resolve(
                    [provide(ModalDialogInstance, {useValue: dialog})]).concat(bindings);
                return this.componentLoader.loadIntoLocation(
                    BootstrapModalContainer, backdropRef.location, 'modalBackdrop', dialogBindings)
                    .then(bootstrapRef => {
                        dialog.bootstrapRef = bootstrapRef;
                        return this.componentLoader.loadIntoLocation(
                            componentType, bootstrapRef.location, 'modalDialog', modalDataBindings)
                            .then(contentRef => {
                                    dialog.contentRef = contentRef;
                                    return dialog;
                                }
                            );
                        }
                    );
            });
*/
    }
    
    public closeDialog(event, theDialog) {
        //console.log(event, theDialog);
        theDialog.destroy();
    }
    
    public openDialog(component:any, parameters:any): Promise<string>  {

       return this.open(<any>component, parameters, component.dialogConfig);
    }

}
