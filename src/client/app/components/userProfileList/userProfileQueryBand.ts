import {Component} from '@angular/core';

import { ShellUsers, TasteProfiles } from '../../shared/moviegenome/index';

@Component({
    selector: 'userprofile-queryband',
    template: `
             <form >
                <label class="fieldPrompt" for="userName" style="margin-right:10px;">User Name</label>
                <input name="userName" type="text" class="fieldEntry"  style="width:180px;height:20px;" [(ngModel)]="userName"/>
                <label class="fieldPrompt" for="profileName" style="margin-right:10px; margin-left:10px;">Profile Name</label>
                <input name="profileName" type="text" class="fieldEntry"  style="width:180px;height:20px;" [(ngModel)]="profileName"/>
                <label class="fieldPrompt" for="profileName" style="margin-right:10px; margin-left:10px;">Profile Origin</label>
                <select class="fieldEntry" style="width:180px;height:20px;" (change)='profileOrigin = $event.target.value' [(value)]='profileOrigin'>
                    <option></option>
                    <option>Learning Engine</option>
                    <option>Curator</option>
                </select>
           </form>
`
})


export class UserProfileQueryBand {
    //
    // declare quey band fields
    //
    public userName: string = '';
    public profileName: string = '';
    public profileOrigin; string = '';

    //
    // build 4C-TV query based on items from query band
    //
    public get currentQuery(): string {
        let currQuery: string = '';

        // Query based on User Name
        if (this.userName && this.userName !== '') {
            currQuery += ShellUsers.kUserName + ';begins with;' + this.userName + ';AND%%';
        }
 
        // Query based on Profile Name
        if (this.profileName && this.profileName !== '') {
            currQuery += TasteProfiles.kName + ';begins with;' + this.profileName + ';AND%%';
        }

        // Query on Profile Originl
        if (this.profileOrigin && this.profileOrigin !== '') {
            currQuery += TasteProfiles.kOrigin + ';=;' + this.profileOrigin + ';AND%%';
        }

        return currQuery;

    }
}
