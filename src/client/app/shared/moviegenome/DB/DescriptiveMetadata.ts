import { FourDModel } from '../../js44D/js44D/JSFourDModel';

export class DescriptiveMetadata extends FourDModel {

	public static kTABLE:string = 'DescriptiveMetadata';
	public static kRecordId:string = 'DescriptiveMetadata.RecordId';
	public static kSeasonID:string = 'DescriptiveMetadata.SeasonID';
	public static kSeriesID:string = 'DescriptiveMetadata.SeriesID';
	public static kTarget:string = 'DescriptiveMetadata.Target';
	public static kAbbrTitle:string = 'DescriptiveMetadata.AbbrTitle';
	public static kShortTitle:string = 'DescriptiveMetadata.ShortTitle';
	public static kLongTitle:string = 'DescriptiveMetadata.LongTitle';
	public static kMarketTitle:string = 'DescriptiveMetadata.MarketTitle';
	public static kTagline:string = 'DescriptiveMetadata.Tagline';
	public static kShortSynopsis:string = 'DescriptiveMetadata.ShortSynopsis';
	public static kLongSynopsis:string = 'DescriptiveMetadata.LongSynopsis';
	public static kGenres:string = 'DescriptiveMetadata.Genres';
	public static kCreationDate:string = 'DescriptiveMetadata.CreationDate';
	public static kLastUpdateDate:string = 'DescriptiveMetadata.LastUpdateDate';
	public static kTimeStamp:string = 'DescriptiveMetadata.TimeStamp';
	public static kFeatureID:string = 'DescriptiveMetadata.FeatureID';
	public static kMDLanguage:string = 'DescriptiveMetadata.MDLanguage';
	public static kMediumSynopsis:string = 'DescriptiveMetadata.MediumSynopsis';

	tableName:string = 'DescriptiveMetadata';
	tableNumber:number = 21;
	primaryKey_:string = 'RecordId';
	fields:Array<any> = [
		{name:'RecordId', longname:'DescriptiveMetadata.RecordId', type:'number', required:true, readonly:true},
		{name:'SeasonID', longname:'DescriptiveMetadata.SeasonID', type:'number'},
		{name:'SeriesID', longname:'DescriptiveMetadata.SeriesID', type:'number'},
		{name:'Target', longname:'DescriptiveMetadata.Target', type:'string', required:true},
		{name:'AbbrTitle', longname:'DescriptiveMetadata.AbbrTitle', type:'string'},
		{name:'ShortTitle', longname:'DescriptiveMetadata.ShortTitle', type:'string'},
		{name:'LongTitle', longname:'DescriptiveMetadata.LongTitle', type:'string'},
		{name:'MarketTitle', longname:'DescriptiveMetadata.MarketTitle', type:'string'},
		{name:'Tagline', longname:'DescriptiveMetadata.Tagline', type:'string'},
		{name:'ShortSynopsis', longname:'DescriptiveMetadata.ShortSynopsis', type:'string'},
		{name:'LongSynopsis', longname:'DescriptiveMetadata.LongSynopsis', type:'string'},
		{name:'Genres', longname:'DescriptiveMetadata.Genres', type:'string'},
		{name:'CreationDate', longname:'DescriptiveMetadata.CreationDate', type:'Date'},
		{name:'LastUpdateDate', longname:'DescriptiveMetadata.LastUpdateDate', type:'Date'},
		{name:'TimeStamp', longname:'DescriptiveMetadata.TimeStamp', type:'string'},
		{name:'FeatureID', longname:'DescriptiveMetadata.FeatureID', type:'number'},
		{name:'MDLanguage', longname:'DescriptiveMetadata.MDLanguage', type:'string', required:true},
		{name:'MediumSynopsis', longname:'DescriptiveMetadata.MediumSynopsis', type:'string'}
	];

	get RecordId():number {return this.get('RecordId');}
	set RecordId(v:number) {this.set('RecordId',v);}

	get SeasonID():number {return this.get('SeasonID');}
	set SeasonID(v:number) {this.set('SeasonID',v);}

	get SeriesID():number {return this.get('SeriesID');}
	set SeriesID(v:number) {this.set('SeriesID',v);}

	get Target():string {return this.get('Target');}
	set Target(v:string) {this.set('Target',v);}

	get AbbrTitle():string {return this.get('AbbrTitle');}
	set AbbrTitle(v:string) {this.set('AbbrTitle',v);}

	get ShortTitle():string {return this.get('ShortTitle');}
	set ShortTitle(v:string) {this.set('ShortTitle',v);}

	get LongTitle():string {return this.get('LongTitle');}
	set LongTitle(v:string) {this.set('LongTitle',v);}

	get MarketTitle():string {return this.get('MarketTitle');}
	set MarketTitle(v:string) {this.set('MarketTitle',v);}

	get Tagline():string {return this.get('Tagline');}
	set Tagline(v:string) {this.set('Tagline',v);}

	get ShortSynopsis():string {return this.get('ShortSynopsis');}
	set ShortSynopsis(v:string) {this.set('ShortSynopsis',v);}

	get LongSynopsis():string {return this.get('LongSynopsis');}
	set LongSynopsis(v:string) {this.set('LongSynopsis',v);}

	get Genres():string {return this.get('Genres');}
	set Genres(v:string) {this.set('Genres',v);}

	get CreationDate():Date {return this.get('CreationDate');}
	set CreationDate(v:Date) {this.set('CreationDate',new Date(<any>v));}

	get LastUpdateDate():Date {return this.get('LastUpdateDate');}
	set LastUpdateDate(v:Date) {this.set('LastUpdateDate',new Date(<any>v));}

	get TimeStamp():string {return this.get('TimeStamp');}
	set TimeStamp(v:string) {this.set('TimeStamp',v);}

	get FeatureID():number {return this.get('FeatureID');}
	set FeatureID(v:number) {this.set('FeatureID',v);}

	get MDLanguage():string {return this.get('MDLanguage');}
	set MDLanguage(v:string) {this.set('MDLanguage',v);}

	get MediumSynopsis():string {return this.get('MediumSynopsis');}
	set MediumSynopsis(v:string) {this.set('MediumSynopsis',v);}


}
