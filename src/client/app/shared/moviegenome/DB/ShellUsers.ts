import { FourDModel } from '../../js44D/index';

export class ShellUsers extends FourDModel {

	public static kTABLE:string = '_ShellUsers';
	public static kID:string = '_ShellUsers.ID';
	public static kisAdmin:string = '_ShellUsers.isAdmin';
	public static kUserName:string = '_ShellUsers.UserName';
	public static kStartupMenu:string = '_ShellUsers.StartupMenu';
	public static kPassword:string = '_ShellUsers.Password';
	public static knbLogins:string = '_ShellUsers.nbLogins';
	public static klastLogin:string = '_ShellUsers.lastLogin';
	public static klastPasswordChange:string = '_ShellUsers.lastPasswordChange';
	public static kChangeNextLogin:string = '_ShellUsers.ChangeNextLogin';
	public static kCannotChange:string = '_ShellUsers.CannotChange';
	public static kNeverExpires:string = '_ShellUsers.NeverExpires';
	public static kAccountDisabled:string = '_ShellUsers.AccountDisabled';
	public static kemailAddress:string = '_ShellUsers.emailAddress';
	public static kFirstName:string = '_ShellUsers.FirstName';
	public static kLastName:string = '_ShellUsers.LastName';
	public static kDOB:string = '_ShellUsers.DOB';
	public static kGender:string = '_ShellUsers.Gender';
	public static kCountry:string = '_ShellUsers.Country';

	tableName:string = '_ShellUsers';
	tableNumber:number = 6;
	primaryKey_:string = 'ID';
	fields:Array<any> = [
		{name:'ID', longname:'_ShellUsers.ID', type:'number', required:true, readonly:true},
		{name:'isAdmin', longname:'_ShellUsers.isAdmin', type:'boolean'},
		{name:'UserName', longname:'_ShellUsers.UserName', type:'string', required:true},
		{name:'StartupMenu', longname:'_ShellUsers.StartupMenu', type:'string'},
		{name:'Password', longname:'_ShellUsers.Password', type:'string'},
		{name:'nbLogins', longname:'_ShellUsers.nbLogins', type:'number'},
		{name:'lastLogin', longname:'_ShellUsers.lastLogin', type:'Date'},
		{name:'lastPasswordChange', longname:'_ShellUsers.lastPasswordChange', type:'Date'},
		{name:'ChangeNextLogin', longname:'_ShellUsers.ChangeNextLogin', type:'boolean'},
		{name:'CannotChange', longname:'_ShellUsers.CannotChange', type:'boolean'},
		{name:'NeverExpires', longname:'_ShellUsers.NeverExpires', type:'boolean'},
		{name:'AccountDisabled', longname:'_ShellUsers.AccountDisabled', type:'boolean'},
		{name:'emailAddress', longname:'_ShellUsers.emailAddress', type:'string'},
		{name:'FirstName', longname:'_ShellUsers.FirstName', type:'string'},
		{name:'LastName', longname:'_ShellUsers.LastName', type:'string'},
		{name:'DOB', longname:'_ShellUsers.DOB', type:'Date'},
		{name:'Gender', longname:'_ShellUsers.Gender', type:'string'},
		{name:'Country', longname:'_ShellUsers.Country', type:'string'}
	];

	get ID():number {return this.get('ID');}
	set ID(v:number) {this.set('ID',v);}

	get isAdmin():boolean {return this.get('isAdmin');}
	set isAdmin(v:boolean) {this.set('isAdmin',v);}

	get UserName():string {return this.get('UserName');}
	set UserName(v:string) {this.set('UserName',v);}

	get StartupMenu():string {return this.get('StartupMenu');}
	set StartupMenu(v:string) {this.set('StartupMenu',v);}

	get Password():string {return this.get('Password');}
	set Password(v:string) {this.set('Password',v);}

	get nbLogins():number {return this.get('nbLogins');}
	set nbLogins(v:number) {this.set('nbLogins',v);}

	get lastLogin():Date {return this.get('lastLogin');}
	set lastLogin(v:Date) {this.set('lastLogin',new Date(<any>v));}

	get lastPasswordChange():Date {return this.get('lastPasswordChange');}
	set lastPasswordChange(v:Date) {this.set('lastPasswordChange',new Date(<any>v));}

	get ChangeNextLogin():boolean {return this.get('ChangeNextLogin');}
	set ChangeNextLogin(v:boolean) {this.set('ChangeNextLogin',v);}

	get CannotChange():boolean {return this.get('CannotChange');}
	set CannotChange(v:boolean) {this.set('CannotChange',v);}

	get NeverExpires():boolean {return this.get('NeverExpires');}
	set NeverExpires(v:boolean) {this.set('NeverExpires',v);}

	get AccountDisabled():boolean {return this.get('AccountDisabled');}
	set AccountDisabled(v:boolean) {this.set('AccountDisabled',v);}

	get emailAddress():string {return this.get('emailAddress');}
	set emailAddress(v:string) {this.set('emailAddress',v);}

	get FirstName():string {return this.get('FirstName');}
	set FirstName(v:string) {this.set('FirstName',v);}

	get LastName():string {return this.get('LastName');}
	set LastName(v:string) {this.set('LastName',v);}

	get DOB():Date {return this.get('DOB');}
	set DOB(v:Date) {this.set('DOB',new Date(<any>v));}

	get Gender():string {return this.get('Gender');}
	set Gender(v:string) {this.set('Gender',v);}

	get Country():string {return this.get('Country');}
	set Country(v:string) {this.set('Country',v);}


}
