import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';

import { DataGrid}  from '../../shared/js44D/index';
import { TasteProfilesEx, ProfileGenes } from '../../shared/moviegenome/index';

@Component({
    selector: 'profilegenes-info',
    template: `
        <div style="height:410px;overflow-y:auto;display:block;">
            <datagrid  style="height:350px"
                [editable]="{mode:'popup'}"
                  [model]="model"
              [columns]="columnDefs"
                [useLazyLoading]="false"
                [pageableRefresh]="false"
                [pageableSizes]="false"
                [pageableMessage]="recordCount"
            ></datagrid>
        </div>
        <div >
            <button class="regularButton" style="margin:10px;width:90px;" (click)="deleteGene()" [disabled]="!weHaveARecord()">Delete</button>
        </div>
     `

})


export class ProfileGenesInfo implements AfterViewInit {
    @Input() public record: TasteProfilesEx;
    
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
        { title: 'ParentVector', width:150, field: 'ParentVector', filterable: { multi: true }  },
        { command: "edit" }
        
    ];

    private initialized:boolean = false;

    @ViewChild(DataGrid) private theGrid: DataGrid;

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
                            this.theGrid.removeRow(this.theGrid.selectedRowIndex());
                        });
                    });
                
            }
        }
    }

    nonEditable(x) {return false}
}
