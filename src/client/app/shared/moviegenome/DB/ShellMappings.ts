import { FourDModel } from '../../js44D/js44D/JSFourDModel';

export class ShellMappings extends FourDModel {

	public static kTABLE:string = 'ShellMappings';
	public static kRecordID:string = 'ShellMappings.RecordID';
	public static kExternalSystem:string = 'ShellMappings.ExternalSystem';
	public static kReference:string = 'ShellMappings.Reference';
	public static kSubReference:string = 'ShellMappings.SubReference';
	public static kExternalValue:string = 'ShellMappings.ExternalValue';
	public static kMappedValue:string = 'ShellMappings.MappedValue';
	public static kCreationDate:string = 'ShellMappings.CreationDate';
	public static kLastUpdateDate:string = 'ShellMappings.LastUpdateDate';
	public static kTimeStamp:string = 'ShellMappings.TimeStamp';

	tableName:string = 'ShellMappings';
	tableNumber:number = 25;
	primaryKey_:string = 'RecordID';
	fields:Array<any> = [
		{name:'RecordID', longname:'ShellMappings.RecordID', type:'number', required:true, readonly:true},
		{name:'ExternalSystem', longname:'ShellMappings.ExternalSystem', type:'string', required:true},
		{name:'Reference', longname:'ShellMappings.Reference', type:'string', required:true},
		{name:'SubReference', longname:'ShellMappings.SubReference', type:'string'},
		{name:'ExternalValue', longname:'ShellMappings.ExternalValue', type:'string', required:true},
		{name:'MappedValue', longname:'ShellMappings.MappedValue', type:'string', required:true},
		{name:'CreationDate', longname:'ShellMappings.CreationDate', type:'Date'},
		{name:'LastUpdateDate', longname:'ShellMappings.LastUpdateDate', type:'Date'},
		{name:'TimeStamp', longname:'ShellMappings.TimeStamp', type:'string'}
	];

	get RecordID():number {return this.get('RecordID');}
	set RecordID(v:number) {this.set('RecordID',v);}

	get ExternalSystem():string {return this.get('ExternalSystem');}
	set ExternalSystem(v:string) {this.set('ExternalSystem',v);}

	get Reference():string {return this.get('Reference');}
	set Reference(v:string) {this.set('Reference',v);}

	get SubReference():string {return this.get('SubReference');}
	set SubReference(v:string) {this.set('SubReference',v);}

	get ExternalValue():string {return this.get('ExternalValue');}
	set ExternalValue(v:string) {this.set('ExternalValue',v);}

	get MappedValue():string {return this.get('MappedValue');}
	set MappedValue(v:string) {this.set('MappedValue',v);}

	get CreationDate():Date {return this.get('CreationDate');}
	set CreationDate(v:Date) {this.set('CreationDate',new Date(<any>v));}

	get LastUpdateDate():Date {return this.get('LastUpdateDate');}
	set LastUpdateDate(v:Date) {this.set('LastUpdateDate',new Date(<any>v));}

	get TimeStamp():string {return this.get('TimeStamp');}
	set TimeStamp(v:string) {this.set('TimeStamp',v);}


}
