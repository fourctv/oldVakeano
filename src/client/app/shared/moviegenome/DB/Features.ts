import { FourDModel } from '../../js44D/js44D/JSFourDModel';

export class Features extends FourDModel {

	public static kTABLE:string = 'Features';
	public static kFeatureId:string = 'Features.FeatureId';
	public static kSeriesID:string = 'Features.SeriesID';
	public static kIMDBID:string = 'Features.IMDBID';
	public static kIMDBTitle:string = 'Features.IMDBTitle';
	public static kProdYear:string = 'Features.ProdYear';
	public static kProductionTitle:string = 'Features.ProductionTitle';
	public static kEpisodeNumber:string = 'Features.EpisodeNumber';
	public static kProdCompanyID:string = 'Features.ProdCompanyID';
	public static kThemeVector:string = 'Features.ThemeVector';
	public static kNarrativeVector:string = 'Features.NarrativeVector';
	public static kContentVector:string = 'Features.ContentVector';
	public static kExecutionVector:string = 'Features.ExecutionVector';
	public static kStyleVector:string = 'Features.StyleVector';
	public static kCreationDate:string = 'Features.CreationDate';
	public static kLastUpdateDate:string = 'Features.LastUpdateDate';
	public static kTimeStamp:string = 'Features.TimeStamp';
	public static kSeasonID:string = 'Features.SeasonID';
	public static kDirectorsList:string = 'Features.DirectorsList';
	public static kFeatureCast:string = 'Features.FeatureCast';
	public static kisStarCentered:string = 'Features.isStarCentered';
	public static kCensorshipRating:string = 'Features.CensorshipRating';
	public static kCountryOfOrigin:string = 'Features.CountryOfOrigin';
	public static kOrigLanguages:string = 'Features.OrigLanguages';
	public static kPosterURL:string = 'Features.PosterURL';
	public static kNarrativeType:string = 'Features.NarrativeType';
	public static kActingType:string = 'Features.ActingType';
	public static kStarName:string = 'Features.StarName';
	public static kisControlFeature:string = 'Features.isControlFeature';

	tableName:string = 'Features';
	tableNumber:number = 20;
	primaryKey_:string = 'FeatureId';
	fields:Array<any> = [
		{name:'FeatureId', longname:'Features.FeatureId', type:'number', required:true, readonly:true},
		{name:'SeriesID', longname:'Features.SeriesID', type:'number'},
		{name:'IMDBID', longname:'Features.IMDBID', type:'string'},
		{name:'IMDBTitle', longname:'Features.IMDBTitle', type:'string', required:true},
		{name:'ProdYear', longname:'Features.ProdYear', type:'number'},
		{name:'ProductionTitle', longname:'Features.ProductionTitle', type:'string'},
		{name:'EpisodeNumber', longname:'Features.EpisodeNumber', type:'number'},
		{name:'ProdCompanyID', longname:'Features.ProdCompanyID', type:'number'},
		{name:'ThemeVector', longname:'Features.ThemeVector', type:'string'},
		{name:'NarrativeVector', longname:'Features.NarrativeVector', type:'string'},
		{name:'ContentVector', longname:'Features.ContentVector', type:'string'},
		{name:'ExecutionVector', longname:'Features.ExecutionVector', type:'string'},
		{name:'StyleVector', longname:'Features.StyleVector', type:'string'},
		{name:'CreationDate', longname:'Features.CreationDate', type:'Date'},
		{name:'LastUpdateDate', longname:'Features.LastUpdateDate', type:'Date'},
		{name:'TimeStamp', longname:'Features.TimeStamp', type:'string'},
		{name:'SeasonID', longname:'Features.SeasonID', type:'number'},
		{name:'DirectorsList', longname:'Features.DirectorsList', type:'string'},
		{name:'FeatureCast', longname:'Features.FeatureCast', type:'string'},
		{name:'isStarCentered', longname:'Features.isStarCentered', type:'boolean'},
		{name:'CensorshipRating', longname:'Features.CensorshipRating', type:'string'},
		{name:'CountryOfOrigin', longname:'Features.CountryOfOrigin', type:'string'},
		{name:'OrigLanguages', longname:'Features.OrigLanguages', type:'string'},
		{name:'PosterURL', longname:'Features.PosterURL', type:'string'},
		{name:'NarrativeType', longname:'Features.NarrativeType', type:'string', required:true},
		{name:'ActingType', longname:'Features.ActingType', type:'string', required:true},
		{name:'StarName', longname:'Features.StarName', type:'string'},
		{name:'isControlFeature', longname:'Features.isControlFeature', type:'boolean'}
	];

	get FeatureId():number {return this.get('FeatureId');}
	set FeatureId(v:number) {this.set('FeatureId',v);}

	get SeriesID():number {return this.get('SeriesID');}
	set SeriesID(v:number) {this.set('SeriesID',v);}

	get IMDBID():string {return this.get('IMDBID');}
	set IMDBID(v:string) {this.set('IMDBID',v);}

	get IMDBTitle():string {return this.get('IMDBTitle');}
	set IMDBTitle(v:string) {this.set('IMDBTitle',v);}

	get ProdYear():number {return this.get('ProdYear');}
	set ProdYear(v:number) {this.set('ProdYear',v);}

	get ProductionTitle():string {return this.get('ProductionTitle');}
	set ProductionTitle(v:string) {this.set('ProductionTitle',v);}

	get EpisodeNumber():number {return this.get('EpisodeNumber');}
	set EpisodeNumber(v:number) {this.set('EpisodeNumber',v);}

	get ProdCompanyID():number {return this.get('ProdCompanyID');}
	set ProdCompanyID(v:number) {this.set('ProdCompanyID',v);}

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

	get CreationDate():Date {return this.get('CreationDate');}
	set CreationDate(v:Date) {this.set('CreationDate',new Date(<any>v));}

	get LastUpdateDate():Date {return this.get('LastUpdateDate');}
	set LastUpdateDate(v:Date) {this.set('LastUpdateDate',new Date(<any>v));}

	get TimeStamp():string {return this.get('TimeStamp');}
	set TimeStamp(v:string) {this.set('TimeStamp',v);}

	get SeasonID():number {return this.get('SeasonID');}
	set SeasonID(v:number) {this.set('SeasonID',v);}

	get DirectorsList():string {return this.get('DirectorsList');}
	set DirectorsList(v:string) {this.set('DirectorsList',v);}

	get FeatureCast():string {return this.get('FeatureCast');}
	set FeatureCast(v:string) {this.set('FeatureCast',v);}

	get isStarCentered():boolean {return this.get('isStarCentered');}
	set isStarCentered(v:boolean) {this.set('isStarCentered',v);}

	get CensorshipRating():string {return this.get('CensorshipRating');}
	set CensorshipRating(v:string) {this.set('CensorshipRating',v);}

	get CountryOfOrigin():string {return this.get('CountryOfOrigin');}
	set CountryOfOrigin(v:string) {this.set('CountryOfOrigin',v);}

	get OrigLanguages():string {return this.get('OrigLanguages');}
	set OrigLanguages(v:string) {this.set('OrigLanguages',v);}

	get PosterURL():string {return this.get('PosterURL');}
	set PosterURL(v:string) {this.set('PosterURL',v);}

	get NarrativeType():string {return this.get('NarrativeType');}
	set NarrativeType(v:string) {this.set('NarrativeType',v);}

	get ActingType():string {return this.get('ActingType');}
	set ActingType(v:string) {this.set('ActingType',v);}

	get StarName():string {return this.get('StarName');}
	set StarName(v:string) {this.set('StarName',v);}

	get isControlFeature():boolean {return this.get('isControlFeature');}
	set isControlFeature(v:boolean) {this.set('isControlFeature',v);}


}
