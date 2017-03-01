import { Component, Input } from '@angular/core';
import { Http } from '@angular/http';

import { LogService } from '../../shared/core/services/log.service';

import { FourDInterface } from '../../shared/js44D/js44D/JSFourDInterface';
import { FourDCollection } from '../../shared/js44D/js44D/JSFourDCollection';

import { ViewerContent, ViewerContentEx, Features, TasteProfiles } from '../../shared/moviegenome/index';

@Component({
    moduleId: module.id,
    selector: 'user-recommendations',
    templateUrl : 'userRecommendations.html' ,
    styleUrls : ['userRecommendations.css']
})

export class UserRecommendations  {
           
    @Input() currentUser:number = FourDInterface.currentUserID;
    @Input() currentRecommendation:string = '';
    
    @Input() profileID:number;
    
    @Input() controlList:FourDCollection = new FourDCollection();
 
    constructor(private fourD:FourDInterface, private http:Http, private log:LogService) {
        if (!FourDInterface.http) FourDInterface.http = http;
    }

    /**
     * Starting up... load all Recommendations for the current User or Profile
     */
    userHasLoggedIn() {
        this.controlList.model = ViewerContentEx;
        let query={custom:"MGSEFilterViewerContent", tableName:"ViewerContent", filter:"recommend"};
         if (this.profileID && this.profileID > 0) {
            query['profileId']=this.profileID;
        } else {
            query['userID']=FourDInterface.currentUserID;
        }

        //this.log.debug('query:'+queryType);
        this.controlList.getRecords(query,
                                    [ViewerContent.kRecordID, ViewerContent.kFeatureID, ViewerContent.kUserID,
                                    Features.kIMDBTitle,Features.kPosterURL, 
                                    ViewerContent.kMGCCI, ViewerContent.kMGEQI, ViewerContent.kMGPAI, 
                                    ViewerContent.kMGPEI, ViewerContent.kMGPVR, ViewerContent.kMGNQI, 
                                    ViewerContent.kFeedback_Content, ViewerContent.kFeedback_Style, ViewerContent.kFeedback_Theme,
                                    ViewerContent.kFeedback_Narrative, ViewerContent.kFeedback_Execution,
                                    TasteProfiles.kDescription],
                                    0, -1, '','<'+ViewerContent.kMGPVR)
            .then(recs => {
                //this.log.debug('length:'+recs.length);
                if (recs.length > 0) {
                    this.currentRecommendation = 'Recommended for you based on: '+recs[0].Description;
                }
             });
    }

    /**
     * Rate a feature, called from the stars under a movie poster
     */
    rateThis(feature:ViewerContentEx, stars:number) {
        let body = {type: 'Feature', 
                    contentID: feature.FeatureID, 
                    rating: stars, 
                    viewer: feature.UserID};
        this.fourD.call4DRESTMethod('MGLErestUpdateViewerProfile', body)
        .subscribe(result => {
            let response = result.json();
            if (response.result === 'OK') {
                let list:Array<ViewerContentEx> = this.controlList.models;
                this.controlList.models = list.filter((item) => {return item.RecordID !== feature.RecordID;});
            } else alert('Error:'+response.message);
        }, error => {console.log(error);alert('Error:'+error);});
           
    }
    
    /**
     * replace new line chars by a Html line breadk
     */
    cleanUpText(text:string):string {
        return text.replace(/\n/g,'<br/>');
    }
}
