import { FourDModel } from '../../js44D/js44D/JSFourDModel';

export class GenomeMap extends FourDModel {

	public static kTABLE:string = 'GenomeMap';
	public static kGeneId:string = 'GenomeMap.GeneId';
	public static kVector:string = 'GenomeMap.Vector';
	public static kCreationDate:string = 'GenomeMap.CreationDate';
	public static kLastUpdateDate:string = 'GenomeMap.LastUpdateDate';
	public static kTimeStamp:string = 'GenomeMap.TimeStamp';
	public static kCluster:string = 'GenomeMap.Cluster';
	public static kCoordinate:string = 'GenomeMap.Coordinate';
	public static kGeneName:string = 'GenomeMap.GeneName';
	public static kGeneDescription:string = 'GenomeMap.GeneDescription';
	public static kAvailableInUI:string = 'GenomeMap.AvailableInUI';
	public static kUIName:string = 'GenomeMap.UIName';
	public static kUIDescription:string = 'GenomeMap.UIDescription';
	public static kUIGroup:string = 'GenomeMap.UIGroup';
	public static kAcceptedValuesList:string = 'GenomeMap.AcceptedValuesList';
	public static kDTPRequired:string = 'GenomeMap.DTPRequired';
	public static kAppNarrativeType:string = 'GenomeMap.AppNarrativeType';
	public static kAppActingType:string = 'GenomeMap.AppActingType';

	tableName:string = 'GenomeMap';
	tableNumber:number = 3;
	primaryKey_:string = 'GeneId';
	fields:Array<any> = [
		{name:'GeneId', longname:'GenomeMap.GeneId', type:'number', required:true, readonly:true},
		{name:'Vector', longname:'GenomeMap.Vector', type:'string', required:true},
		{name:'CreationDate', longname:'GenomeMap.CreationDate', type:'Date'},
		{name:'LastUpdateDate', longname:'GenomeMap.LastUpdateDate', type:'Date'},
		{name:'TimeStamp', longname:'GenomeMap.TimeStamp', type:'string'},
		{name:'Cluster', longname:'GenomeMap.Cluster', type:'string', required:true},
		{name:'Coordinate', longname:'GenomeMap.Coordinate', type:'number', required:true},
		{name:'GeneName', longname:'GenomeMap.GeneName', type:'string', required:true},
		{name:'GeneDescription', longname:'GenomeMap.GeneDescription', type:'string'},
		{name:'AvailableInUI', longname:'GenomeMap.AvailableInUI', type:'boolean'},
		{name:'UIName', longname:'GenomeMap.UIName', type:'string'},
		{name:'UIDescription', longname:'GenomeMap.UIDescription', type:'string'},
		{name:'UIGroup', longname:'GenomeMap.UIGroup', type:'string'},
		{name:'AcceptedValuesList', longname:'GenomeMap.AcceptedValuesList', type:'string', required:true},
		{name:'DTPRequired', longname:'GenomeMap.DTPRequired', type:'boolean'},
		{name:'AppNarrativeType', longname:'GenomeMap.AppNarrativeType', type:'string'},
		{name:'AppActingType', longname:'GenomeMap.AppActingType', type:'string'}
	];

	get GeneId():number {return this.get('GeneId');}
	set GeneId(v:number) {this.set('GeneId',v);}

	get Vector():string {return this.get('Vector');}
	set Vector(v:string) {this.set('Vector',v);}

	get CreationDate():Date {return this.get('CreationDate');}
	set CreationDate(v:Date) {this.set('CreationDate',new Date(<any>v));}

	get LastUpdateDate():Date {return this.get('LastUpdateDate');}
	set LastUpdateDate(v:Date) {this.set('LastUpdateDate',new Date(<any>v));}

	get TimeStamp():string {return this.get('TimeStamp');}
	set TimeStamp(v:string) {this.set('TimeStamp',v);}

	get Cluster():string {return this.get('Cluster');}
	set Cluster(v:string) {this.set('Cluster',v);}

	get Coordinate():number {return this.get('Coordinate');}
	set Coordinate(v:number) {this.set('Coordinate',v);}

	get GeneName():string {return this.get('GeneName');}
	set GeneName(v:string) {this.set('GeneName',v);}

	get GeneDescription():string {return this.get('GeneDescription');}
	set GeneDescription(v:string) {this.set('GeneDescription',v);}

	get AvailableInUI():boolean {return this.get('AvailableInUI');}
	set AvailableInUI(v:boolean) {this.set('AvailableInUI',v);}

	get UIName():string {return this.get('UIName');}
	set UIName(v:string) {this.set('UIName',v);}

	get UIDescription():string {return this.get('UIDescription');}
	set UIDescription(v:string) {this.set('UIDescription',v);}

	get UIGroup():string {return this.get('UIGroup');}
	set UIGroup(v:string) {this.set('UIGroup',v);}

	get AcceptedValuesList():string {return this.get('AcceptedValuesList');}
	set AcceptedValuesList(v:string) {this.set('AcceptedValuesList',v);}

	get DTPRequired():boolean {return this.get('DTPRequired');}
	set DTPRequired(v:boolean) {this.set('DTPRequired',v);}

	get AppNarrativeType():string {return this.get('AppNarrativeType');}
	set AppNarrativeType(v:string) {this.set('AppNarrativeType',v);}

	get AppActingType():string {return this.get('AppActingType');}
	set AppActingType(v:string) {this.set('AppActingType',v);}


}
