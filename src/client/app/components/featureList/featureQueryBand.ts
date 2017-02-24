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
    public get currentQuery(): Object {
        let query:any;

         // Query based on Feature title
        if (this.programTitle && this.programTitle !== '') {
            query={query:[Features.kIMDBTitle+ ';contains;' + this.programTitle + ';OR', Features.kProductionTitle+ ';contains;' + this.programTitle + ';OR']};
        }

        // query based on to be curated flag
        if (this.toBeCurated) {
            let curated = [];
            curated.push(Features.kContentVector+ ';=;;OR');
            curated.push(Features.kExecutionVector+ ';=;;OR');
            curated.push(Features.kNarrativeVector+ ';=;;OR');
            curated.push(Features.kStyleVector+ ';=;;OR');
            curated.push(Features.kThemeVector+ ';=;;OR');
            if (query) query = {intersection:[query,{query:curated}]} 
            else query ={query:curated};

       }
         
        return query;

    }
}
