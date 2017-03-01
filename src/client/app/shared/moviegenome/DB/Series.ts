import { FourDModel } from '../../js44D/js44D/JSFourDModel';

export class Series extends FourDModel {

	public static kTABLE:string = 'Series';
	public static kSeriesId:string = 'Series.SeriesId';
	public static kCreationDate:string = 'Series.CreationDate';
	public static kLastUpdateDate:string = 'Series.LastUpdateDate';
	public static kTimeStamp:string = 'Series.TimeStamp';
	public static kIMDBID:string = 'Series.IMDBID';
	public static kIMDBTitle:string = 'Series.IMDBTitle';
	public static kProdYear:string = 'Series.ProdYear';
	public static kProductionTitle:string = 'Series.ProductionTitle';
	public static kThemeVector:string = 'Series.ThemeVector';
	public static kNarrativeVector:string = 'Series.NarrativeVector';
	public static kContentVector:string = 'Series.ContentVector';
	public static kExecutionVector:string = 'Series.ExecutionVector';
	public static kStyleVector:string = 'Series.StyleVector';
	public static kNarrativeType:string = 'Series.NarrativeType';
	public static kActingType:string = 'Series.ActingType';

	tableName:string = 'Series';
	tableNumber:number = 18;
	primaryKey_:string = 'SeriesId';
	fields:Array<any> = [
		{name:'SeriesId', longname:'Series.SeriesId', type:'number', required:true, readonly:true},
		{name:'CreationDate', longname:'Series.CreationDate', type:'Date'},
		{name:'LastUpdateDate', longname:'Series.LastUpdateDate', type:'Date'},
		{name:'TimeStamp', longname:'Series.TimeStamp', type:'string'},
		{name:'IMDBID', longname:'Series.IMDBID', type:'string'},
		{name:'IMDBTitle', longname:'Series.IMDBTitle', type:'string', required:true},
		{name:'ProdYear', longname:'Series.ProdYear', type:'number'},
		{name:'ProductionTitle', longname:'Series.ProductionTitle', type:'string'},
		{name:'ThemeVector', longname:'Series.ThemeVector', type:'string'},
		{name:'NarrativeVector', longname:'Series.NarrativeVector', type:'string'},
		{name:'ContentVector', longname:'Series.ContentVector', type:'string'},
		{name:'ExecutionVector', longname:'Series.ExecutionVector', type:'string'},
		{name:'StyleVector', longname:'Series.StyleVector', type:'string'},
		{name:'NarrativeType', longname:'Series.NarrativeType', type:'string', required:true},
		{name:'ActingType', longname:'Series.ActingType', type:'string', required:true}
	];

	get SeriesId():number {return this.get('SeriesId');}
	set SeriesId(v:number) {this.set('SeriesId',v);}

	get CreationDate():Date {return this.get('CreationDate');}
	set CreationDate(v:Date) {this.set('CreationDate',new Date(<any>v));}

	get LastUpdateDate():Date {return this.get('LastUpdateDate');}
	set LastUpdateDate(v:Date) {this.set('LastUpdateDate',new Date(<any>v));}

	get TimeStamp():string {return this.get('TimeStamp');}
	set TimeStamp(v:string) {this.set('TimeStamp',v);}

	get IMDBID():string {return this.get('IMDBID');}
	set IMDBID(v:string) {this.set('IMDBID',v);}

	get IMDBTitle():string {return this.get('IMDBTitle');}
	set IMDBTitle(v:string) {this.set('IMDBTitle',v);}

	get ProdYear():number {return this.get('ProdYear');}
	set ProdYear(v:number) {this.set('ProdYear',v);}

	get ProductionTitle():string {return this.get('ProductionTitle');}
	set ProductionTitle(v:string) {this.set('ProductionTitle',v);}

	get ThemeVector():string {return this.get('ThemeVector');}
	set ThemeVector(v:string) {this.set('ThemeVector',v);}

	get NarrativeVector():string {return this.get('NarrativeVector');}
	set NarrativeVector(v:string) {this.set('NarrativeVector',v);}

	get ContentVector():string {return this.get('ContentVector');}
	set ContentVector(v:string) {this.set('ContentVector',v);}

	get ExecutionVector():string {return this.get('ExecutionVector');}
	set ExecutionVector(v:string) {this.set('ExecutionVector',v);}

	get StyleVector():string {return this.get('StyleVector');}
	set StyleVector(v:string) {this.set('StyleVector',v);}

	get NarrativeType():string {return this.get('NarrativeType');}
	set NarrativeType(v:string) {this.set('NarrativeType',v);}

	get ActingType():string {return this.get('ActingType');}
	set ActingType(v:string) {this.set('ActingType',v);}


}
