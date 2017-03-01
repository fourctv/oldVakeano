import { FourDModel } from '../../js44D/js44D/JSFourDModel';

export class ProfileGenes extends FourDModel {

	public static kTABLE:string = 'ProfileGenes';
	public static kRecordID:string = 'ProfileGenes.RecordID';
	public static kCreationDate:string = 'ProfileGenes.CreationDate';
	public static kLastUpdateDate:string = 'ProfileGenes.LastUpdateDate';
	public static kTimeStamp:string = 'ProfileGenes.TimeStamp';
	public static kProfileID:string = 'ProfileGenes.ProfileID';
	public static kFrequency:string = 'ProfileGenes.Frequency';
	public static kWeight:string = 'ProfileGenes.Weight';
	public static kGeneID:string = 'ProfileGenes.GeneID';
	public static kWeightedRating:string = 'ProfileGenes.WeightedRating';
	public static kCoordinateValue:string = 'ProfileGenes.CoordinateValue';
	public static kThemeGeneID:string = 'ProfileGenes.ThemeGeneID';
	public static kCumValue:string = 'ProfileGenes.CumValue';
	public static kParentVector:string = 'ProfileGenes.ParentVector';

	tableName:string = 'ProfileGenes';
	tableNumber:number = 29;
	primaryKey_:string = 'RecordID';
	fields:Array<any> = [
		{name:'RecordID', longname:'ProfileGenes.RecordID', type:'number', required:true, readonly:true},
		{name:'CreationDate', longname:'ProfileGenes.CreationDate', type:'Date'},
		{name:'LastUpdateDate', longname:'ProfileGenes.LastUpdateDate', type:'Date'},
		{name:'TimeStamp', longname:'ProfileGenes.TimeStamp', type:'string'},
		{name:'ProfileID', longname:'ProfileGenes.ProfileID', type:'number', required:true},
		{name:'Frequency', longname:'ProfileGenes.Frequency', type:'number'},
		{name:'Weight', longname:'ProfileGenes.Weight', type:'number'},
		{name:'GeneID', longname:'ProfileGenes.GeneID', type:'number', required:true},
		{name:'WeightedRating', longname:'ProfileGenes.WeightedRating', type:'Number'},
		{name:'CoordinateValue', longname:'ProfileGenes.CoordinateValue', type:'string'},
		{name:'ThemeGeneID', longname:'ProfileGenes.ThemeGeneID', type:'number'},
		{name:'CumValue', longname:'ProfileGenes.CumValue', type:'number'},
		{name:'ParentVector', longname:'ProfileGenes.ParentVector', type:'string'}
	];

	get RecordID():number {return this.get('RecordID');}
	set RecordID(v:number) {this.set('RecordID',v);}

	get CreationDate():Date {return this.get('CreationDate');}
	set CreationDate(v:Date) {this.set('CreationDate',new Date(<any>v));}

	get LastUpdateDate():Date {return this.get('LastUpdateDate');}
	set LastUpdateDate(v:Date) {this.set('LastUpdateDate',new Date(<any>v));}

	get TimeStamp():string {return this.get('TimeStamp');}
	set TimeStamp(v:string) {this.set('TimeStamp',v);}

	get ProfileID():number {return this.get('ProfileID');}
	set ProfileID(v:number) {this.set('ProfileID',v);}

	get Frequency():number {return this.get('Frequency');}
	set Frequency(v:number) {this.set('Frequency',v);}

	get Weight():number {return this.get('Weight');}
	set Weight(v:number) {this.set('Weight',v);}

	get GeneID():number {return this.get('GeneID');}
	set GeneID(v:number) {this.set('GeneID',v);}

	get WeightedRating():Number {return this.get('WeightedRating');}
	set WeightedRating(v:Number) {this.set('WeightedRating',v);}

	get CoordinateValue():string {return this.get('CoordinateValue');}
	set CoordinateValue(v:string) {this.set('CoordinateValue',v);}

	get ThemeGeneID():number {return this.get('ThemeGeneID');}
	set ThemeGeneID(v:number) {this.set('ThemeGeneID',v);}

	get CumValue():number {return this.get('CumValue');}
	set CumValue(v:number) {this.set('CumValue',v);}

	get ParentVector():string {return this.get('ParentVector');}
	set ParentVector(v:string) {this.set('ParentVector',v);}


}
