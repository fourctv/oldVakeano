// angular
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule }      from '@angular/common';

import { QueryBand, CustomButtonBarDirective, QueryBandDirective } from './containers/queryBand';
import { RecordEditWindow, RecordList, Tabs, Tab, WebAppContainer } from './index';
import { FourDDropDown, QuickFindInput  } from './index';
import { DataGrid } from './index';
import { LoginCmp  } from './index';
import { JSAppLoader, FlexAppLoader  } from './index';
import { Modal, ModalDialogInstance, ICustomModal } from './index';
import { FourDInterface, FourDModel, FourDCollection } from './index';

@NgModule({
      imports: [ FormsModule, CommonModule ],
      declarations: [ 
            QueryBand, CustomButtonBarDirective, QueryBandDirective,
            RecordEditWindow, RecordList, Tabs, Tab, WebAppContainer,
            FourDDropDown, QuickFindInput,
            DataGrid,
            LoginCmp,
            JSAppLoader, FlexAppLoader
            ], 
      exports: [ 
            FormsModule, CommonModule, 
            QueryBand, CustomButtonBarDirective, QueryBandDirective,
            RecordEditWindow, RecordList, Tabs, Tab, WebAppContainer,
            FourDDropDown, QuickFindInput,
            DataGrid,
            LoginCmp,
            JSAppLoader, FlexAppLoader
            ], 
      entryComponents: [ RecordEditWindow, LoginCmp ],
      providers:[ Modal, ModalDialogInstance, ICustomModal, FourDInterface, FourDModel, FourDCollection ]
})
export class JS44DModule { }
