import { Component, ViewChild, ViewContainerRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

import { DataGrid }  from '../../modules/js44D/dataGrid/dataGrid';
import { Modal } from '../../modules/js44D/angular2-modal/providers/Modal';
import { TasteProfilesEx, ProfileGenes, ProfileGenesEx } from '../../modules/moviegenome/index';

import { ProfileGenesInfoDialog } from './profileGenesInfoInfoDialog';

@Component({
    selector: 'profilegenes-info',
    template: `
        <div style="height:410px;overflow-y:auto;display:block;">
            <datagrid  style="height:350px"
                 [columns]="columnDefs"
                [useLazyLoading]="false"
                [pageableRefresh]="false"
                [pageableSizes]="false"
                [pageableMessage]="recordCount"
            ></datagrid>
        </div>
        <div >
            <button class="regularButton" style="margin:10px;width:90px;" (click)="deleteGene()" [disabled]="!weHaveARecord()">Delete</button>
            <button class="regularButton" style="margin:10px;width:90px;" (click)="editGene()" [disabled]="!weHaveARecord()">Edit</button>
       </div>
     `

})


export class ProfileGenesInfo implements AfterViewInit {
    @Input() public record: TasteProfilesEx;

    @Output() public profileUpdated:EventEmitter<any> = new EventEmitter();
   
    public get recordCount():string {return (this.record.profileGenesList)?this.record.profileGenesList.length.toString()+' items':'0';}
    
    public model = ProfileGenes; // the record datamodel to use 
    public columnDefs = [
        { title: 'Gene ID', width:80, field: 'GeneID'},
        { title: 'Gene Name', width:250, field: 'GeneName'},
        { title: 'Gene Vector', width:150, field: 'GeneVector', filterable: { multi: true }  },
        { title: 'Gene Cluster', width:150, field: 'GeneCluster', filterable: { multi: true }  },
        { title: 'Value', width:80, field: 'CoordinateValue' },
        { title: 'Frequency', width:80, field: 'Frequency' },
        { title: 'Weight', width:80, field: 'Weight' },
        { title: 'Weight.Rating', width:80, field: 'WeightedRating' },
        { title: 'Cum Value', width:80, field: 'CumValue' },
        { title: 'Theme Gene', width:80, field: 'ThemeGeneID'},
        { title: 'Parent Vector', width:150, field: 'ParentVector', filterable: { multi: true }  }
        
    ];

    private initialized:boolean = false;

    @ViewChild(DataGrid) private theGrid: DataGrid;

    constructor(private modal: Modal, private viewref:ViewContainerRef) {
    }

    ngAfterViewInit() {
        this.refreshGrid();
    }

    refreshGrid() {
        if (this.record && this.theGrid) {
            //this.theGrid.model = new ProfileGenes;
            this.theGrid.setDataSource(<any>this.record.profileGenesList);
            this.initialized = true;
        }
    }

    weHaveARecord():boolean {
        if (this.initialized) {
            return (this.theGrid.selectedRow())?true:false;
        } return false;
    }

    deleteGene() {
        let theRecord = this.theGrid.selectedRow();
        if (theRecord) {
            if (confirm('Really delete selected profile gene?')) {
                let profileRec:ProfileGenes = new ProfileGenes();
                profileRec.getRecord(null, (<ProfileGenes>theRecord).RecordID.toString())
                    .then(rec => {
                        profileRec.deleteRecord().then(()=> {                            
                            console.log('delete:',theRecord['RecordID'],', index:',this.theGrid.selectedRowIndex());
                            this.profileUpdated.emit();
                        });
                    });
                
            }
        }
    }

    editGene() {
        let theRecord = this.theGrid.selectedRow();
        if (theRecord) {
            let profileGene:ProfileGenesEx = new ProfileGenesEx();
            kendo.ui.progress($(this.viewref.element.nativeElement), true); // show loading progress icon
            profileGene.getRecord(null, theRecord['RecordID'])
            .then (rec => {
                kendo.ui.progress($(this.viewref.element.nativeElement), false); // hide loading progress icon
                let editWindow = ProfileGenesInfoDialog;
                this.modal.openDialog(editWindow, profileGene)
                .then(() => {
                    this.profileUpdated.emit();
                });
            });
            
        }
    }

    nonEditable(x) {return false;}
}
