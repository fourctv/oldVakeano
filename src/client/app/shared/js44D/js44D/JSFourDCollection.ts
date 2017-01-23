import { Injectable, ReflectiveInjector } from '@angular/core';
import { encode } from 'base-64';

import { LogService } from '../../core/services/log.service';
//import { Config } from '../../core/utils/config';

import { FourDInterface } from './JSFourDInterface';
import { FourDModel } from './JSFourDModel';

@Injectable()
export class FourDCollection {

    //
    // FourDCollection properties
    //
    public model:any; // the model this collection is based on
    public models:Array<any> = []; // array of models in the collection
    public orderBy: string;    // default order by string
    public queryString: string = 'All'; // default query string 
    public filterQuery: string; // default filter to be applied on all queries

    public columns: any[] = []; // columns to be populated on the Collection

    public currentRecord: FourDModel; // holds current record from the current selection
    public totalRecordCount: number = 0; // holds the total # of records found on the latst query
        
    public url: string = '/4DAction/REST_GetRecords';
        
    // injected FourDInterface service
    private fourD:FourDInterface;
    
    // the generic log service
    private log:LogService;
        
    //
    // constructor: initialize collection properties
    //
    constructor(/*@Inject(FourDModel) model?: FourDModel, cols?: any[], query?: string, order?: string, filter?: string*/) {
//        this.model = <any>model;
//        this.columns = cols;
//        this.queryString = query;
//        this.filterQuery = filter;
         // inject FourDInterface
        let injector = ReflectiveInjector.resolveAndCreate([FourDInterface]);
        this.fourD = injector.get(FourDInterface);
        this.log = FourDInterface.log;
  }

    /**
     * prepares the XML field description to send to 4D, listing all columns to retrieve
     */
    getColumnListXML(columns:Array<any>): string {
        if (!columns) columns = this.columns;
        var cols = '<columns>';
        for (var i in columns) {
            var col = columns[i];
            if (typeof (col) === 'string') {
                if (col.indexOf('.') > 0) { // is this a longname field?
                    cols += '<column name="' + col.substr(col.indexOf('.') + 1) + '">' + col + '</column>';
                } else { // nope, so let's see if we have it in our datamodel
                    let modelDef = <any>(this.model);
                    let theModel: FourDModel = <any>(new modelDef());
                    var fld = theModel.getFieldProperties(col);
                    if (fld) { // field in our datamodel, use its properties
                        if (fld.formula) {
                            cols += '<column name="' + fld.name + '">[' + fld.formula + ']</column>';
                        } else cols += '<column name="' + fld.name + '">' + fld.longname + '</column>';
                    }
                }
            } else if (col.field) {
                let modelDef = <any>(this.model);
                let theModel: FourDModel = <any>(new modelDef());
                var fld = theModel.getFieldProperties(col.field);
                if (fld) {
                    if (fld.formula) {
                        cols += '<column name="' + fld.name + '">[' + fld.formula + ']</column>';
                    } else cols += '<column name="' + fld.name + '">' + fld.longname + '</column>';
                }
            } else {
                if (col.formula) {
                    cols += '<column name="' + col.name + '">[' + col.formula + ']</column>';
                } else cols += '<column name="' + col.name + '">' + col.longname + '</column>';
            }
        }

        return cols + '</columns>';
    }

    /**
     * Retrieves a list of records using a query string 
     *  @param query
     * 	@param columnList custom column list to retrieve, XML listing the columns to retrieve.
     * <p>if informed, only the columns listed will be retrieved instead of the whole record</p>
     * 
     * 	@param startRec the starting record number to retrieve, used for paging.
     * 	@param numOfRecords the number of records to retrieve, the default -1 will retrieve all records in the resulting query.
     *  @param filterOptions
     *  @param orderBy optional order By clause to retrieve records in a set order.
     * <p> in the format:</p>
     *    &gt;table.field : to sort records by table.field in ascending order
     *    &lt;table.field : to sort records by table.field in descending order
     * 
     * 
     * @return returns a Promise for the database operation
     */
    public getRecords(query: string = null, columns: Array<string> = null, startRec: number = 0, numOfRecords: number = -1, filter: string = null, orderby: string = null): Promise<FourDCollection> {
        if (!query || query === '') {
            query = this.queryString;
        }
        if (columns) {
            this.columns = columns;
        }
        if (!filter || filter === '') {
            filter = this.filterQuery;
        }
        if (!orderby || orderby === '') {
            orderby = this.orderBy;
        }
            
        /*
        return new Promise((resolve, reject) => {
            this.fetch().then((recList) => {resolve(recList);}).fail((error) => {reject(error);});
        });
        */

        let body: any = { Username: FourDInterface.currentUser };
        let modelDef = <any>(this.model);
        let newModel: FourDModel = <any>(new modelDef());
        body.TableName = newModel.tableName;
        body.StartRec = startRec;
        body.NumRecs = numOfRecords;

        body.QueryString = query;
        body.Columns = encode((columns)?this.getColumnListXML(columns):this.getColumnListXML(newModel.getColumnList()));

        if (filter) body.FilterOptions = filter;
        if (orderby) body.OrderBy = orderby;

        return new Promise((resolve, reject) => {
            let me = this;
            this.fourD.call4DRESTMethod('REST_GetRecords', body)
                .subscribe(
                response => {
                    me.totalRecordCount = 0;
                    me.models = [];
                    let jsonData = response.json();
                    /*
                    if (Config.IS_MOBILE_NATIVE()) {
                        // on nativescript
                        jsonData = JSON.parse(jsonData);
                    }
                    */
                    if (jsonData && jsonData.length === 2) {
                        me.totalRecordCount = jsonData[0].total_entries;
                        let recList: Array<any> = jsonData[1];
                        recList.forEach(record => {
                            let modelDef = <any>(me.model);
                            let newModel: FourDModel = <any>(new modelDef());
                            newModel.populateModelData(record);
                            me.models.push(newModel);
                        });
                    }

                    resolve(me.models);
                },
                error => {
                    this.log.debug('error:' + error.text());
                    reject(error.text());
                });
        });

    }

    /**
     * returns the length of the Collection, or the # of records loaded in
     */
    public get length():number {
        return this.models.length;
    }


}

