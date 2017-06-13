import { TasteProfiles, ShellUsers, ProfileGenes, ProfileGenesEx, ViewerContent, ViewerContentEx } from '../index';

export class TasteProfilesEx extends TasteProfiles {
    fields: Array<any> = [
        { name: 'UserName', longname: ShellUsers.kUserName, type: 'text', related: true },
        { name: 'profileGenesList', subTable: new ProfileGenesEx(), joinFK: ProfileGenes.kProfileID, joinPK: TasteProfiles.kProfileID },
        { name: 'viewerContentList', subTable: new ViewerContentEx(), joinFK: ViewerContent.kProfileID, joinPK: TasteProfiles.kProfileID }
   ].concat(new TasteProfiles().fields);

    // related fields

    get UserName(): string { return this.get('UserName'); }
    set UserName(v: string) { this.set('UserName', v); }

    // children records
    get profileGenesList(): Array<ProfileGenes> {
        return this.get('profileGenesList');
    }
    set profileGenesList(v: Array<ProfileGenes>) { this.set('profileGenesList', v); }

    get viewerContentList(): Array<ViewerContent> {
        return this.get('viewerContentList');
    }
    set viewerContentList(v: Array<ViewerContent>) { this.set('viewerContentList', v); }

}

