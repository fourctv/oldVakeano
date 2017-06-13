import {Component } from '@angular/core';
import { Http } from '@angular/http';

import { FourDInterface } from '../../modules/js44D/js44D/JSFourDInterface';

import {GenomeMap} from '../../modules/moviegenome/index';

import {GenomeMapInfoDialog} from './genomeMapInfoDialog';


@Component({
    selector: 'genomemap-list',
    template: `
    <web-application>
        <record-list [editWindow]="editWindow">
            <query-band [enableSort]="true" [enableQBE]="true" [enableButtonBar]="true" [enableAddRecord]="true" [enableDeleteRecord]="true">
                <queryband class="form-group">
                    <genomemap-queryband #customQueryBand class="form-group"></genomemap-queryband>
                </queryband>
            </query-band>

            <datagrid
                [height]="'calc(100% - 150px)'"
                [model]="model"
                [columns]="columnDefs"
                [optimizeGridLoading]="true"
                [pageSize]="50"
                [useLazyLoading]="true"
                >
            </datagrid>
        </record-list>
     </web-application>
    `
})

export class GenomeMapListApp {  
           
    //
    // Declare Program edit Window
    //
    public editWindow = GenomeMapInfoDialog;
 //
    // Declare Datagrid properties
    //
    public model = GenomeMap; // the record datamodel to use 
    // the columns for the datagrid
    public columnDefs = [
        { title: 'Gene ID', field: 'GeneId', width:80},
        { title: 'Gene Name', field: 'GeneName', width:250 },
        { title: 'Cluster', field: 'Cluster', width:150, filterable: { multi: true } },
        { title: 'Vector', field: 'Vector', width:150, filterable: { multi: true } },
        { title: 'Coordinate', field: 'Coordinate', width:80 },
       // { title: 'Description', field: 'GeneDescription', filterable: { search: true} },
        { title: 'Narrative Type', field: 'AppNarrativeType', width:150, filterable: { multi: true} },
        { title: 'Acting Type', field: 'AppActingType', width:150, filterable: { multi: true} },
        { title: 'UI Name', field: 'UIName', width:250}
    ];
    
    constructor(private http:Http) {
         if (!FourDInterface.http) FourDInterface.http = http;
    }

}
