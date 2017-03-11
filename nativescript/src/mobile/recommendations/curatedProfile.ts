import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LogService } from '../../app/shared/core/index';
import { RouterExtensions } from 'nativescript-angular';


import { FourDInterface } from '../../app/shared/js44D/js44D/JSFourDInterface';
import { FourDCollection } from '../../app/shared/js44D/js44D/JSFourDCollection';

import { TasteProfiles } from '../../app/shared/moviegenome/index';

@Component({
    moduleId: module.id,
    selector: 'curatedprofile',
    templateUrl : 'curatedProfile.html' ,
    changeDetection: ChangeDetectionStrategy.Default
})

export class CuratedProfiles implements OnInit {
           
   
    @Input() profileList:FourDCollection = new FourDCollection();
    @Input() isLoading = false;


    constructor(private fourD:FourDInterface, private log:LogService, private router:RouterExtensions) {
       
    }

    /**
     * Starting up... load all Recommendations for the current User or Profile
     */
    ngOnInit() {
        this.isLoading = true;
        this.profileList.model = TasteProfiles;
        this.refreshList();
    }
    
  
    refreshList() {
        let query={query:[TasteProfiles.kOrigin+';=;Curator']};

        //this.log.debug('query:'+queryType);
        this.profileList.getRecords(query,
                                    [TasteProfiles.kProfileID, TasteProfiles.kName, TasteProfiles.kDescription])
            .then(recs => {
                this.log.debug('length:'+recs.length);
                if (recs.length > 0) {
                     this.isLoading = false;
                 }
             });
    }

    //
    // handle user tap on a title: show details
    //
    onItemTap(event) {
        let selectProfile:TasteProfiles = this.profileList.models[event.index];
        this.log.debug('tap:'+selectProfile.Name);
        this.router.navigate(['/curatedRecommendationPage',selectProfile.ProfileID], { clearHistory:true })
    }

}
