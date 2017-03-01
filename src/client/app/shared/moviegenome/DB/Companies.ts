import { FourDModel } from '../../js44D/js44D/JSFourDModel';

export class Companies extends FourDModel {

	public static kTABLE:string = 'Companies';
	public static kCompanyID:string = 'Companies.CompanyID';
	public static kCreationDate:string = 'Companies.CreationDate';
	public static kLastUpdateDate:string = 'Companies.LastUpdateDate';
	public static kTimeStamp:string = 'Companies.TimeStamp';
	public static kShortName:string = 'Companies.ShortName';
	public static kLongName:string = 'Companies.LongName';
	public static kCompanyRoles:string = 'Companies.CompanyRoles';

	tableName:string = 'Companies';
	tableNumber:number = 27;
	primaryKey_:string = 'CompanyID';
	fields:Array<any> = [
		{name:'CompanyID', longname:'Companies.CompanyID', type:'number', required:true, readonly:true},
		{name:'CreationDate', longname:'Companies.CreationDate', type:'Date'},
		{name:'LastUpdateDate', longname:'Companies.LastUpdateDate', type:'Date'},
		{name:'TimeStamp', longname:'Companies.TimeStamp', type:'string'},
		{name:'ShortName', longname:'Companies.ShortName', type:'string', required:true},
		{name:'LongName', longname:'Companies.LongName', type:'string'},
		{name:'CompanyRoles', longname:'Companies.CompanyRoles', type:'string', required:true}
	];

	get CompanyID():number {return this.get('CompanyID');}
	set CompanyID(v:number) {this.set('CompanyID',v);}

	get CreationDate():Date {return this.get('CreationDate');}
	set CreationDate(v:Date) {this.set('CreationDate',new Date(<any>v));}

	get LastUpdateDate():Date {return this.get('LastUpdateDate');}
	set LastUpdateDate(v:Date) {this.set('LastUpdateDate',new Date(<any>v));}

	get TimeStamp():string {return this.get('TimeStamp');}
	set TimeStamp(v:string) {this.set('TimeStamp',v);}

	get ShortName():string {return this.get('ShortName');}
	set ShortName(v:string) {this.set('ShortName',v);}

	get LongName():string {return this.get('LongName');}
	set LongName(v:string) {this.set('LongName',v);}

	get CompanyRoles():string {return this.get('CompanyRoles');}
	set CompanyRoles(v:string) {this.set('CompanyRoles',v);}


}
