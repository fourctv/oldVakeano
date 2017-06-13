import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { ModalConfig } from '../../modules/js44D/angular2-modal/models/ModalConfig';
import { ICustomModal } from '../../modules/js44D/angular2-modal/models/ICustomModal';
import { FourDInterface } from '../../modules/js44D/js44D/JSFourDInterface';
import { DataGrid } from '../../modules/js44D/dataGrid/dataGrid';
import { TasteProfilesEx } from '../../modules/moviegenome/index';

@Component({
    selector: 'analyze-feature',
    template: `
    <div class="formPanel">
        <h1>Vakeano Feature Analyzer</h1>
        <br/>
        <div class="row" style="padding-left:10px;">
            <h4>Select the Taste Profile to use for analyzing: <span style="color:green;">{{inputData.featureName}}</span></h4>
            <button class="regularButton" style="width:120px;margin-left:380px" (click)="checkFeature()">Analyze</button>
        </div>
        <div style="margin-bottom:15px;">
            <h3>Results:</h3>
            <textarea style="width:950px;height:120px" class="fieldEntry" type="text" [(ngModel)]="analyzeResponse" disable></textarea>
        </div>
       <div>   
                <datagrid  [height]="340"
                    [columns]="columnDefs"
                    [model]="model"
                    [useLazyLoading]="false"
                    [pageableRefresh]="false"
                    [pageableSizes]="false"
                ></datagrid>
        </div>
    </div>
     `
})

export class AnalyzeFeatureComponent implements AfterViewInit {
    public static dialogConfig: ModalConfig = <ModalConfig>{
        size: 'lg',
        actions: ['Maximize', 'Minimize', 'Close'], position: { top: 50, left: 50 }, selfCentered: true,
        title: 'Analyze Feature',
        isResizable: false,
        width: 1000, height: 700
    };

    public analyzeResponse:string;
    
    //
    // Declare Datagrid properties
    //
    public model = TasteProfilesEx; // the record datamodel to use 

    // the columns for the datagrid
    public columnDefs = [
        { title: 'Profile ID', field: 'ProfileID', width: 30 },
        { title: 'User ID', field: 'UserID', width: 30 },
        { title: 'User Name', field: 'UserName', width: 80 },
        { title: 'Profile Name', field: 'Name', width: 80 },
        { title: 'Origin', field: 'Origin', width: 80 },
        { title: 'Description', field: 'Description', width: 120 }
    ];

    public set modelContentData(v:ICustomModal) {
        this.inputData = v;
    }

    public inputData: any;

    @ViewChild(DataGrid) private theGrid: DataGrid;

    constructor(private fourD:FourDInterface) { }

    ngAfterViewInit() {
        this.theGrid.loadData({query:['All']});
    }

    public checkFeature() {
        this.analyzeResponse = '';
        if (this.theGrid && this.theGrid.currentRecord) {
            let body = {
                featureID: (<any>this.inputData).featureID,
                profileID: (<TasteProfilesEx>this.theGrid.currentRecord).ProfileID
            };
            this.fourD.call4DRESTMethod('MGRErestCheckFeature', body)
                .subscribe(result => {
                    this.analyzeResponse = result.text();
                }, error => { console.log(error); alert('Error:' + error); });
        }
    }

}
