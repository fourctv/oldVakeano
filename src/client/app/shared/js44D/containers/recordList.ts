import { Component, ContentChild, ElementRef, AfterContentInit, Input } from '@angular/core';

import { QueryBand } from './queryBand';
import { DataGrid } from '../dataGrid/dataGrid';
import { Modal, ICustomModalComponent } from '../angular2-modal/index';

@Component({
    selector: 'record-list',
    template: '<div class="recordList"><ng-content></ng-content></div>',
    providers: [Modal]
})

export class RecordList implements AfterContentInit {

    /**
     * this is the associated record edit dialog, if set dbl-cliking a row or hitting the Add/Edit buttons will open it
     */
    @Input() public editWindow: ICustomModalComponent = null;

    /**
     * get the associated Query band and Datagrid object instances
     */
    @ContentChild(QueryBand) queryBand: QueryBand;
    @ContentChild(DataGrid) theGrid: DataGrid;

    private _previousQuery:string = '';

    //
    // We need access to a Modal dialog component, to open an associated Record Edit Form 
    //
    constructor(private modal: Modal, private elementRef: ElementRef) {
    }

    /**
     * AFter our view gets initialized, subscribe to various events on the Query band and the Grid
     */
    ngAfterContentInit() {
        // if we have a query band, then subscribe to the query refresh and export to excel buttons
        if (this.queryBand) {
            // if user hits Refresh button, call grid refrech method
            this.queryBand.queryRefresh.subscribe((query: string) => { this.refreshGrid(query); });
            // it used hits Export to Excel, call grid's excel export method
            this.queryBand.queryExportGrid.subscribe(() => { if (this.theGrid) this.theGrid.exportGridToExcel(); });

            if (this.editWindow) {
                this.queryBand.queryAddRecord.subscribe(() => { this.showEditWindow('add'); });
                this.queryBand.queryEditRecord.subscribe(() => { this.showEditWindow('edit'); });
            }

            this.queryBand.queryDeleteRecord.subscribe(() => { this.deleteRecord(); });

        }

        // if we have a grid and an associated edit record form, subscribe to the record select event
        if (this.theGrid && this.editWindow) {
            this.theGrid.recordSelected.subscribe((record: any) => { this.showEditWindow('edit'); });
        }
    }

    /**
     * Refresh teh Grid, run query on 4D side and get records to display
     * @param query: the query string to send to 4D to select records to display on the grid
     */
    public refreshGrid(query?: string) {
        if (!(query && query !== '')) query = this._previousQuery; // if no query given, try previous
        if (query && query !== '' && this.theGrid) this.theGrid.loadData(query);
        this._previousQuery = query; // save last queryDeleteRecord
    }

    /**
     * Show record edit window, to either edit or add a new record
     */
    public showEditWindow(mode: string) {
        // if editing a record, and we do have a record selected and an edit dialog does exist
        if (this.theGrid && this.editWindow && mode === 'edit' && this.theGrid.currentRecord) {
            if (this.theGrid.optimizeGridLoading) { // if we are optimizing the grid, then we need to refresh selected record
                kendo.ui.progress($(this.elementRef.nativeElement), true); // show loading progress icon
                this.theGrid.currentRecord.refresh().then(() => { // refresh current record
                    kendo.ui.progress($(this.elementRef.nativeElement), false); // clear loading progress icon
                    this.modal.openDialog(this.editWindow, this.theGrid.currentRecord)
                        .then(result => {this.editWindowHandler(result);}); // open edit dialog
                });
            } else {
                // if not optimizing the grid loading, then we have a complete record loaded already
                this.modal.openDialog(this.editWindow, this.theGrid.currentRecord)
                    .then(result => {this.editWindowHandler(result);}); // open edit dialog
            }
        }

        if (this.theGrid && this.editWindow && mode === 'add') {
            // if we are adding a new record
            let modelDef = <any>(this.theGrid.model);
            let newModel = <any>(new modelDef());
            this.modal.openDialog(this.editWindow, newModel); // open edit dialog
        }
    }

    /** 
     * Delete Selected Record(s)
     */
    public deleteRecord() {
        if (this.theGrid && this.theGrid.currentRecord) {
            if (confirm('Really delete selected record?')) {
                this.theGrid.currentRecord.deleteRecord()
                    .then((message) => { alert('Record Deleted'); this.queryBand.doRefresh(); })
                    .catch((reason) => { alert(reason); });
            }
        }
    }

    /**
     * private method to deal with edit windoe close
     */
    private editWindowHandler(result:string) {
        if (result === 'recordSaved') this.refreshGrid();
    }
}
