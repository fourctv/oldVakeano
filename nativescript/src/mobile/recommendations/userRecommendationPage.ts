import { Component, Input, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { LogService } from '../../app/shared/core/index';
import { RouterExtensions } from 'nativescript-angular';

import { openUrl } from "utils/utils";
import { SwipeGestureEventData, SwipeDirection } from "ui/gestures";

import { FourDCollection, FourDInterface } from '../../app/shared/js44D/index';

import { ViewerContent, ViewerContentEx, Features } from '../../app/shared/moviegenome/index';


@Component({
    moduleId: module.id,
    selector: 'userrecommendation',
    templateUrl: 'userRecommendationPage.html',
    changeDetection: ChangeDetectionStrategy.Default
})

export class UserRecommendationPage implements OnInit {
           
    @Input() currentUser:number = FourDInterface.currentUserID;
 
    @Input() profileID:number;
    
    @Input() controlList:FourDCollection = new FourDCollection();
    @Input() currentFeature:ViewerContentEx = new ViewerContentEx();
    @Input() isLoading = false;

    // fontawesome icons
    @Input() thumbsUp:string = "\uf164";
    @Input() arrow:string = '\uf137';
    @Input() loveIt:string = '\uf004';
    @Input() thumbsDown:string = '\uf165';

    private currentFeatureIndex:number = 0;


    constructor(private fourD:FourDInterface, private log:LogService, private router:RouterExtensions) {
       
    }

    /**
     * Starting up... load all Recommendations for the current User or Profile
     */
    ngOnInit() {
        this.isLoading = true;
        this.controlList.model = ViewerContentEx;
        this.recommendationList();
    }


    /**
     * Rate a feature, called from the stars under a movie poster
     */
    rateThis(stars:number) {
        let body = {type: 'Feature', 
                    contentID: this.currentFeature.FeatureID, 
                    rating: stars, 
                    viewer: this.currentFeature.UserID};
        this.fourD.call4DRESTMethod('MGLErestUpdateViewerProfile', body)
        .subscribe(result => {
            let response = result.json();
            if (response.result === 'OK') {
                this.nextFeature();
            } else alert('Error:'+response.message);
        }, error => {this.log.debug(error);alert('Error:'+error);});
           
    }

 
    recommendationList() {
        let query={custom:"MGSEFilterViewerContent", tableName:"ViewerContent", filter:"recommend"};
         if (this.profileID && this.profileID > 0) {
            query['profileId']=this.profileID;
        } else {
            query['userID']=FourDInterface.currentUserID;
        }
        //this.log.debug('query:'+queryType);
        this.controlList.getRecords(query,
                                    [ViewerContent.kRecordID, ViewerContent.kFeatureID, ViewerContent.kUserID,
                                    ViewerContent.kMGPEI, ViewerContent.kMGPAI, ViewerContent.kMGCCI, ViewerContent.kMGEQI, ViewerContent.kMGNQI,
                                    Features.kIMDBID, Features.kIMDBTitle,Features.kPosterURL, 
                                    Features.kProdYear, Features.kFeatureCast, Features.kDirectorsList],
                                    0, -1, '','<'+ViewerContent.kMGPVR)
            .then(recs => {
                //this.log.debug('length:'+recs.length);
                if (recs.length > 0) {
                    this.currentFeature = recs[0];
                    this.isLoading = false;
                 }
             });
    }



    showIMDB() {
        openUrl("http://www.imdb.com/title/"+this.currentFeature.IMDBID);
    }

    //
    // handle user swipe on a title
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

    currentFeatureScore():string {
        let score = (((this.currentFeature.MGPEI + this.currentFeature.MGPAI) * this.currentFeature.MGCCI)/2 + this.currentFeature.MGEQI+this.currentFeature.MGNQI).toFixed(2);
        return score;
    }

}
