import { FourDModel } from '../../js44D/js44D/JSFourDModel';

export class ShellLists extends FourDModel {

	public static kTABLE:string = 'ShellLists';
	public static kRecordID:string = 'ShellLists.RecordID';
	public static kCreationDate:string = 'ShellLists.CreationDate';
	public static kLastUpdateDate:string = 'ShellLists.LastUpdateDate';
	public static kTimeStamp:string = 'ShellLists.TimeStamp';
	public static kListName:string = 'ShellLists.ListName';
	public static kElementShortValue:string = 'ShellLists.ElementShortValue';
	public static kElementLongValue:string = 'ShellLists.ElementLongValue';
	public static kElementAltValue1:string = 'ShellLists.ElementAltValue1';
	public static kElementAltValue2:string = 'ShellLists.ElementAltValue2';
	public static kElementMaxLen:string = 'ShellLists.ElementMaxLen';

	tableName:string = 'ShellLists';
	tableNumber:number = 24;
	primaryKey_:string = 'RecordID';
	fields:Array<any> = [
		{name:'RecordID', longname:'ShellLists.RecordID', type:'number', required:true, readonly:true},
		{name:'CreationDate', longname:'ShellLists.CreationDate', type:'Date'},
		{name:'LastUpdateDate', longname:'ShellLists.LastUpdateDate', type:'Date'},
		{name:'TimeStamp', longname:'ShellLists.TimeStamp', type:'string'},
		{name:'ListName', longname:'ShellLists.ListName', type:'string', required:true},
		{name:'ElementShortValue', longname:'ShellLists.ElementShortValue', type:'string', required:true},
		{name:'ElementLongValue', longname:'ShellLists.ElementLongValue', type:'string'},
		{name:'ElementAltValue1', longname:'ShellLists.ElementAltValue1', type:'string'},
		{name:'ElementAltValue2', longname:'ShellLists.ElementAltValue2', type:'string'},
		{name:'ElementMaxLen', longname:'ShellLists.ElementMaxLen', type:'number'}
	];

	get RecordID():number {return this.get('RecordID');}
	set RecordID(v:number) {this.set('RecordID',v);}

	get CreationDate():Date {return this.get('CreationDate');}
	set CreationDate(v:Date) {this.set('CreationDate',new Date(<any>v));}

	get LastUpdateDate():Date {return this.get('LastUpdateDate');}
	set LastUpdateDate(v:Date) {this.set('LastUpdateDate',new Date(<any>v));}

	get TimeStamp():string {return this.get('TimeStamp');}
	set TimeStamp(v:string) {this.set('TimeStamp',v);}

	get ListName():string {return this.get('ListName');}
	set ListName(v:string) {this.set('ListName',v);}

	get ElementShortValue():string {return this.get('ElementShortValue');}
	set ElementShortValue(v:string) {this.set('ElementShortValue',v);}

	get ElementLongValue():string {return this.get('ElementLongValue');}
	set ElementLongValue(v:string) {this.set('ElementLongValue',v);}

	get ElementAltValue1():string {return this.get('ElementAltValue1');}
	set ElementAltValue1(v:string) {this.set('ElementAltValue1',v);}

	get ElementAltValue2():string {return this.get('ElementAltValue2');}
	set ElementAltValue2(v:string) {this.set('ElementAltValue2',v);}

	get ElementMaxLen():number {return this.get('ElementMaxLen');}
	set ElementMaxLen(v:number) {this.set('ElementMaxLen',v);}


}
