import { FourDModel } from '../../js44D/js44D/JSFourDModel';

export class ViewerContent extends FourDModel {

	public static kTABLE:string = 'ViewerContent';
	public static kRecordID:string = 'ViewerContent.RecordID';
	public static kCreationDate:string = 'ViewerContent.CreationDate';
	public static kLastUpdateDate:string = 'ViewerContent.LastUpdateDate';
	public static kTimeStamp:string = 'ViewerContent.TimeStamp';
	public static kFeatureID:string = 'ViewerContent.FeatureID';
	public static kSeasonID:string = 'ViewerContent.SeasonID';
	public static kSeriesID:string = 'ViewerContent.SeriesID';
	public static kMGCCI:string = 'ViewerContent.MGCCI';
	public static kUserID:string = 'ViewerContent.UserID';
	public static kFeedback_Theme:string = 'ViewerContent.Feedback_Theme';
	public static kProfileID:string = 'ViewerContent.ProfileID';
	public static kRecommendationDate:string = 'ViewerContent.RecommendationDate';
	public static kUserScore:string = 'ViewerContent.UserScore';
	public static kScoreDate:string = 'ViewerContent.ScoreDate';
	public static kIsRejected:string = 'ViewerContent.IsRejected';
	public static kMGPEI:string = 'ViewerContent.MGPEI';
	public static kFeedback_Content:string = 'ViewerContent.Feedback_Content';
	public static kMGEQI:string = 'ViewerContent.MGEQI';
	public static kMGPAI:string = 'ViewerContent.MGPAI';
	public static kMGPVR:string = 'ViewerContent.MGPVR';
	public static kFeedback_Style:string = 'ViewerContent.Feedback_Style';
	public static kMGNQI:string = 'ViewerContent.MGNQI';
	public static kFeedback_Narrative:string = 'ViewerContent.Feedback_Narrative';
	public static kFeedback_Execution:string = 'ViewerContent.Feedback_Execution';

	tableName:string = 'ViewerContent';
	tablenumber:number = 31;
	primaryKey_:string = 'RecordID';
	fields:Array<any> = [
		{name:'RecordID', longname:'ViewerContent.RecordID', type:'number', required:true, readonly:true},
		{name:'CreationDate', longname:'ViewerContent.CreationDate', type:'Date'},
		{name:'LastUpdateDate', longname:'ViewerContent.LastUpdateDate', type:'Date'},
		{name:'TimeStamp', longname:'ViewerContent.TimeStamp', type:'string'},
		{name:'FeatureID', longname:'ViewerContent.FeatureID', type:'number', relatesTo:'Features.FeatureId'},
		{name:'SeasonID', longname:'ViewerContent.SeasonID', type:'number', relatesTo:'Seasons.SeasonId'},
		{name:'SeriesID', longname:'ViewerContent.SeriesID', type:'number', relatesTo:'Series.SeriesId'},
		{name:'MGCCI', longname:'ViewerContent.MGCCI', type:'number'},
		{name:'UserID', longname:'ViewerContent.UserID', type:'number', required:true, relatesTo:'_ShellUsers.ID'},
		{name:'Feedback_Theme', longname:'ViewerContent.Feedback_Theme', type:'string'},
		{name:'ProfileID', longname:'ViewerContent.ProfileID', type:'number', required:true, relatesTo:'TasteProfiles.ProfileID'},
		{name:'RecommendationDate', longname:'ViewerContent.RecommendationDate', type:'Date'},
		{name:'UserScore', longname:'ViewerContent.UserScore', type:'number'},
		{name:'ScoreDate', longname:'ViewerContent.ScoreDate', type:'Date'},
		{name:'IsRejected', longname:'ViewerContent.IsRejected', type:'boolean'},
		{name:'MGPEI', longname:'ViewerContent.MGPEI', type:'number'},
		{name:'Feedback_Content', longname:'ViewerContent.Feedback_Content', type:'string'},
		{name:'MGEQI', longname:'ViewerContent.MGEQI', type:'number'},
		{name:'MGPAI', longname:'ViewerContent.MGPAI', type:'number'},
		{name:'MGPVR', longname:'ViewerContent.MGPVR', type:'number'},
		{name:'Feedback_Style', longname:'ViewerContent.Feedback_Style', type:'string'},
		{name:'MGNQI', longname:'ViewerContent.MGNQI', type:'number'},
		{name:'Feedback_Narrative', longname:'ViewerContent.Feedback_Narrative', type:'string'},
		{name:'Feedback_Execution', longname:'ViewerContent.Feedback_Execution', type:'string'}
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

	get MGCCI():number {return this.get('MGCCI');}
	set MGCCI(v:number) {this.set('MGCCI',v);}

	get UserID():number {return this.get('UserID');}
	set UserID(v:number) {this.set('UserID',v);}

	get Feedback_Theme():string {return this.get('Feedback_Theme');}
	set Feedback_Theme(v:string) {this.set('Feedback_Theme',v);}

	get ProfileID():number {return this.get('ProfileID');}
	set ProfileID(v:number) {this.set('ProfileID',v);}

	get RecommendationDate():Date {return this.get('RecommendationDate');}
	set RecommendationDate(v:Date) {this.set('RecommendationDate',new Date(<any>v));}

	get UserScore():number {return this.get('UserScore');}
	set UserScore(v:number) {this.set('UserScore',v);}

	get ScoreDate():Date {return this.get('ScoreDate');}
	set ScoreDate(v:Date) {this.set('ScoreDate',new Date(<any>v));}

	get IsRejected():boolean {return this.get('IsRejected');}
	set IsRejected(v:boolean) {this.set('IsRejected',v);}

	get MGPEI():number {return this.get('MGPEI');}
	set MGPEI(v:number) {this.set('MGPEI',v);}

	get Feedback_Content():string {return this.get('Feedback_Content');}
	set Feedback_Content(v:string) {this.set('Feedback_Content',v);}

	get MGEQI():number {return this.get('MGEQI');}
	set MGEQI(v:number) {this.set('MGEQI',v);}

	get MGPAI():number {return this.get('MGPAI');}
	set MGPAI(v:number) {this.set('MGPAI',v);}

	get MGPVR():number {return this.get('MGPVR');}
	set MGPVR(v:number) {this.set('MGPVR',v);}

	get Feedback_Style():string {return this.get('Feedback_Style');}
	set Feedback_Style(v:string) {this.set('Feedback_Style',v);}

	get MGNQI():number {return this.get('MGNQI');}
	set MGNQI(v:number) {this.set('MGNQI',v);}

	get Feedback_Narrative():string {return this.get('Feedback_Narrative');}
	set Feedback_Narrative(v:string) {this.set('Feedback_Narrative',v);}

	get Feedback_Execution():string {return this.get('Feedback_Execution');}
	set Feedback_Execution(v:string) {this.set('Feedback_Execution',v);}


}
