import {Component} from '@angular/core';

import {Features} from '../../shared/moviegenome/index';

@Component({
    selector: 'features-queryband',
    template: `
            <form>
                <label class="fieldPrompt" for="programTitle" style="margin-right:10px;">Feature Title</label>
                <input name="programTitle" type="text" class="fieldEntry"  style="width:180px;height:20px;" [(ngModel)]="programTitle"/>
                <input type="checkbox" class="fieldEntry" name="toBeCurated" [(ngModel)]="toBeCurated" style="margin-left:30px;margin-right:10px;"/>to be Curated
            </form>
`
})


export class FeatureQueryBand {
    //
    // declare quey band fields
    //
    public programTitle: string = '';
    public toBeCurated: boolean = false;
      
    //
    // build 4C-TV query based on items from query band
    //
    public get currentQuery(): string {
        let currQuery: string = '';
 
        // query based on to be curated flag
        if (this.toBeCurated) {
            currQuery += Features.kContentVector+ ';=;;OR%%';
            currQuery += Features.kExecutionVector+ ';=;;OR%%';
            currQuery += Features.kNarrativeVector+ ';=;;OR%%';
            currQuery += Features.kStyleVector+ ';=;;OR%%';
            currQuery += Features.kThemeVector+ ';=;;OR%%';
       }
         // Query based on Channel
        if (this.programTitle && this.programTitle !== '') {
            currQuery += Features.kIMDBTitle+ ';contains;' + this.programTitle + ';OR%%';
            currQuery += Features.kProductionTitle+ ';contains;' + this.programTitle + ';OR%%';
        }
        
        return currQuery;

    }
}
