import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LogService } from '../../app/shared/core/index';
import { RouterExtensions } from 'nativescript-angular';

import { openUrl } from "utils/utils";
import { SwipeGestureEventData, SwipeDirection } from "ui/gestures";

import { FourDInterface } from '../../app/shared/js44D/js44D/JSFourDInterface';
import { FourDCollection } from '../../app/shared/js44D/js44D/JSFourDCollection';

import { Features } from '../../app/shared/moviegenome/index';

@Component({
    moduleId: module.id,
    selector: 'profilebuilding',
   templateUrl: 'profileBuildingPage.html' ,
    changeDetection: ChangeDetectionStrategy.Default
})

export class ProfileBuildingPage implements OnInit {
           
    @Input() currentUser:number = FourDInterface.currentUserID;
     
    @Input() controlList:FourDCollection = new FourDCollection();
    @Input() currentFeature:Features = new Features();
    @Input() frontPageisUp = true;
    @Input() isLoading = false;
    @Input() rateCount:string = 'none';

    // fontawesome icons
    @Input() thumbsUp:string = "\uf164";
    @Input() arrow:string = '\uf137';
    @Input() loveIt:string = '\uf004';
    @Input() thumbsDown:string = '\uf165';

    private currentFeatureIndex:number = 0;
    private ratedFeatures:number = 0;

    constructor(private fourD:FourDInterface, private log:LogService, private router:RouterExtensions) {
       
    }

    /**
     * Starting up... load all Recommendations for the current User or Profile
     */
    ngOnInit() {
        this.isLoading = true;
        this.controlList.model = Features;
        this.ratingList();
    }


    /**
     * Rate a feature, called from the stars under a movie poster
     */
    rateThis(stars:number) {
        let body = {type: 'Feature', 
                    contentID: this.currentFeature.FeatureId, 
                    rating: stars, 
                    viewer: this.currentUser};
        this.fourD.call4DRESTMethod('MGLErestUpdateViewerProfile', body)
        .subscribe(result => {
            let response = result.json();
            if (response.result === 'OK') {
                this.nextFeature();
            } else alert('Error:'+response.message);
        }, error => {this.log.debug(error);alert('Error:'+error);});
           
        this.ratedFeatures++;
        this.rateCount = (this.ratedFeatures > 0)?this.ratedFeatures.toString():'none';
    }

 
    ratingList() {
        this.controlList.getRecords(<any>{custom:"MGSEFilterViewerContent", tableName:"Features", filter:"control", userID:this.currentUser},
            [Features.kIMDBID, Features.kIMDBTitle,Features.kPosterURL, Features.kFeatureId,
            Features.kProdYear, Features.kFeatureCast, Features.kDirectorsList])
            .then(recs => {
                //this.log.debug('length:'+recs.length);
                if (recs.length > 0) {
                    this.currentFeature = recs[0];
                    this.isLoading = false;
                 }
             });
    }



    showIMDB( ) {
        openUrl("http://www.imdb.com/title/"+this.currentFeature.IMDBID);
    }
    //
    // handle user swipe on a row
    //
    onSwipe(event:SwipeGestureEventData) {
        switch (event.direction) {
            case SwipeDirection.left:
                this.nextFeature();
                break;
        
            case SwipeDirection.right:
                this.rateThis(5);
                break;

            case SwipeDirection.down:
                this.rateThis(1);
                break;

            case SwipeDirection.up:
                this.rateThis(4);
                break;

       }
     }

    nextFeature() {
        if (++this.currentFeatureIndex < this.controlList.models.length) this.currentFeature = this.controlList.models[this.currentFeatureIndex];
     }

   fullResPosterURL(): string {
        let poster:string = this.currentFeature.PosterURL;
        if (poster) {
            let marker = poster.indexOf("._");
            return (marker>0)?poster.substr(0,marker)+ '._V1_UX512_.jpg':poster;
        } else return poster;
    }

}
