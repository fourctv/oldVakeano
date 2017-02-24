import { Component, Input, AfterViewInit} from '@angular/core';

import {ShellLists} from '../DB/ShellLists';

import {FourDCollection} from '../../js44D/js44D/JSFourDCollection';

@Component({
    selector: 'mglist-dropdown',
    styles : [`.mglistDropdown {
                margin: inherit;
                width: inherit;
                padding: inherit;
                font-size: inherit;
                border: 1px solid #ccc;
                height: inherit;
                }
            `], 
    template: `
        <select  #selector class='mglistDropdown' (change)='selectedValue = $event.target.value' [(value)]='selectedValue'>
            <option *ngFor='let item of listOptions' value='{{item}}' [selected]='isItemSelected(item)'>{{item}}</option>
        </select>
       `
})

export class MGListDropDown implements AfterViewInit {
    @Input() public listName: string;
    @Input() public selectedValue: string;
    @Input() public listOptions: Array<string> = [];

    private shellList:ShellLists;

    ngAfterViewInit() {
        if (this.listName) {
            this.shellList = new ShellLists();
            let query = {query:[ShellLists.kListName+';=;'+this.listName]}
            this.shellList.getRecords(query)
                .then((recs:FourDCollection) => {
                    this.listOptions = [''];
                    recs.models.forEach((rec:ShellLists) => {
                        this.listOptions.push(rec.ElementShortValue);
                    });
                })
                .catch((reason) => { console.log('error', reason); });
        }
    }

    isItemSelected(item: string): string {
        return (item === this.selectedValue) ? 'selected' : '';
    }

}
