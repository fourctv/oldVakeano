import { Component, Input, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ActivatedRoute }     from '@angular/router';
import { Observable }         from 'rxjs/Observable';
import { LogService } from '../../app/shared/core/index';
import { RouterExtensions } from 'nativescript-angular';

import { openUrl } from "utils/utils";
import { SwipeGestureEventData, SwipeDirection } from "ui/gestures";

import { FourDInterface } from '../../app/shared/js44D/js44D/JSFourDInterface';
import { FourDCollection } from '../../app/shared/js44D/js44D/JSFourDCollection';

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

    private swipeCount:number = 0;
    constructor(private fourD:FourDInterface, private log:LogService, private router:RouterExtensions, private route: ActivatedRoute) {
       
    }

    /**
     * Starting up... load all Recommendations for the current User or Profile
     */
    ngOnInit() {
        this.log.debug('rec:'+JSON.stringify(this.route.params));
        this.route.params.forEach(param => {
            if (param['profileID']) {
                this.log.debug('profile:'+param['profileID']);
                this.profileID = + param['profileID'];
            } ;})
 
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
                    viewer: FourDInterface.currentUserID};
        this.fourD.call4DRESTMethod('MGLErestUpdateViewerProfile', body)
        .subscribe(result => {
            let response = result.json();
            if (response.result === 'OK') {
                this.nextFeature();
            } else alert('Error:'+response.message);
        }, error => {this.log.debug(error);alert('Error:'+error);});
           
    }

 
    recommendationList() {
        let query={custom:"MGSEFilterViewerContent", tableName:"ViewerContent", filter:"recommend", userID:FourDInterface.currentUserID};
         if (this.profileID && this.profileID > 0) {
            query['profileID']=this.profileID;
        }
        this.log.debug('query:'+JSON.stringify(query));
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
        this.log.debug('swipe:'+(++this.swipeCount));
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
