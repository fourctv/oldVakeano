// angular
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule }      from '@angular/common';

import { QueryBand, CustomButtonBarDirective, QueryBandDirective } from './containers/queryBand';
import { RecordList } from './containers/recordList';
import { RecordEditWindow } from './containers/recordEditWindow';
import { Tabs, Tab } from './containers/tabs';
import { WebAppContainer } from './containers/webAppContainer';
import { FourDDropDown  } from './controls/fourDDropDown';
import { QuickFindInput  } from './controls/quickFindInput';
import { DataGrid } from './dataGrid/dataGrid';
import { LoginCmp  } from './login/login';
import { JSAppLoader  } from './services/jsAppLoader';
import { FlexAppLoader  } from './services/flexAppLoader';

//import { FourDInterface } from './js44D/JSFourDInterface';
//import { FourDModel } from './js44D/JSFourDModel';
//import { FourDCollection } from './js44D/JSFourDCollection';

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
      entryComponents: [ RecordEditWindow, LoginCmp, JSAppLoader, FlexAppLoader ]
})
export class JS44DModule { }
