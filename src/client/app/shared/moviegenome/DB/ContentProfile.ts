import { FourDModel } from '../../js44D/js44D/JSFourDModel';

export class ContentProfile extends FourDModel {

	public static kTABLE:string = 'ContentProfile';
	public static kRecordID:string = 'ContentProfile.RecordID';
	public static kCreationDate:string = 'ContentProfile.CreationDate';
	public static kLastUpdateDate:string = 'ContentProfile.LastUpdateDate';
	public static kTimeStamp:string = 'ContentProfile.TimeStamp';
	public static kFeatureID:string = 'ContentProfile.FeatureID';
	public static kSeasonID:string = 'ContentProfile.SeasonID';
	public static kSeriesID:string = 'ContentProfile.SeriesID';
	public static kGeneID:string = 'ContentProfile.GeneID';
	public static kCuratorID:string = 'ContentProfile.CuratorID';
	public static kCoordinateValue:string = 'ContentProfile.CoordinateValue';

	tableName:string = 'ContentProfile';
	tableNumber:number = 17;
	primaryKey_:string = 'RecordID';
	fields:Array<any> = [
		{name:'RecordID', longname:'ContentProfile.RecordID', type:'number', required:true, readonly:true},
		{name:'CreationDate', longname:'ContentProfile.CreationDate', type:'Date'},
		{name:'LastUpdateDate', longname:'ContentProfile.LastUpdateDate', type:'Date'},
		{name:'TimeStamp', longname:'ContentProfile.TimeStamp', type:'string'},
		{name:'FeatureID', longname:'ContentProfile.FeatureID', type:'number'},
		{name:'SeasonID', longname:'ContentProfile.SeasonID', type:'number'},
		{name:'SeriesID', longname:'ContentProfile.SeriesID', type:'number'},
		{name:'GeneID', longname:'ContentProfile.GeneID', type:'number', required:true},
		{name:'CuratorID', longname:'ContentProfile.CuratorID', type:'number', required:true},
		{name:'CoordinateValue', longname:'ContentProfile.CoordinateValue', type:'string'}
	];

	get RecordID():number {return this.get('RecordID');}
	set RecordID(v:number) {this.set('RecordID',v);}

	get CreationDate():Date {return this.get('CreationDate');}
	set CreationDate(v:Date) {this.set('CreationDate',new Date(<any>v));}

	get LastUpdateDate():Date {return this.get('LastUpdateDate');}
	set LastUpdateDate(v:Date) {this.set('LastUpdateDate',new Date(<any>v));}

	get TimeStamp():string {return this.get('TimeStamp');}
	set TimeStamp(v:string) {this.set('TimeStamp',v);}

	get FeatureID():number {return this.get('FeatureID');}
	set FeatureID(v:number) {this.set('FeatureID',v);}

	get SeasonID():number {return this.get('SeasonID');}
	set SeasonID(v:number) {this.set('SeasonID',v);}

	get SeriesID():number {return this.get('SeriesID');}
	set SeriesID(v:number) {this.set('SeriesID',v);}

	get GeneID():number {return this.get('GeneID');}
	set GeneID(v:number) {this.set('GeneID',v);}

	get CuratorID():number {return this.get('CuratorID');}
	set CuratorID(v:number) {this.set('CuratorID',v);}

	get CoordinateValue():string {return this.get('CoordinateValue');}
	set CoordinateValue(v:string) {this.set('CoordinateValue',v);}


}
