import { NgModuleFactoryLoader,
    Injectable,
    ReflectiveInjector,
    ViewContainerRef,
} from '@angular/core';

 class ICustomModal {};


//
// opens o popup window
//

@Injectable()
export class PopupWindow {
		//---------------
    // Properties
    //---------------
    /**
     * flag to indicate if the window should center itself automatically.
     * default is <b>true</b>
     */
    public selfCentered:Boolean = true;

    private theDialog:any;
    
    constructor(private componentLoader: NgModuleFactoryLoader, private appRef: ViewContainerRef,
                private injector: ReflectiveInjector) { }


    open(component:any, parameters:any, ref?:ViewContainerRef):Promise<any>  {
        /*
        let bindings = ReflectiveInjector.resolve([
            {provide: ICustomModal, useValue: parameters}
        ]);
        
        let elementRef: ViewContainerRef = (ref)?ref:this.appRef;
        */
        let me = this;
        return this.componentLoader.load(component)
            .then(contentRef => {
                let comp = contentRef.create(this.injector).instance;
                me.theDialog = $(comp.location.nativeElement).kendoWindow({visible:false,
                    actions: ['Maximize', 'Minimize', 'Close'],
                    draggable: true,
                    modal: false,
                    pinned: false,
                    resizable: true
                    }).data('kendoWindow');
                if (me.selfCentered) {
                    me.theDialog.center().open(); 
                } else me.theDialog.open(); 
            }
        );
 
    }
}
