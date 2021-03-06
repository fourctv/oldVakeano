import { Component, Input, AfterViewInit } from '@angular/core';

import { LogService } from '../../modules/core/services/logging/log.service';

import { FourDInterface } from '../../modules/js44D/js44D/JSFourDInterface';
import { FourDCollection } from '../../modules/js44D/js44D/JSFourDCollection';

import { ViewerContent, ViewerContentEx, Features, TasteProfiles } from '../../modules/moviegenome/index';

@Component({
    moduleId: module.id,
    selector: 'user-recommendations',
    templateUrl : 'userRecommendations.html' ,
    styleUrls : ['userRecommendations.css']
})

export class UserRecommendations implements AfterViewInit {
           
    @Input() currentUser:number = FourDInterface.currentUserID;
    @Input() currentRecommendation:string = 'your viewer/rating profile';
      
    @Input() controlList:FourDCollection = new FourDCollection();
   
    @Input() curatedProfiles:Array<any> = [];
    @Input() profileID:number;
    @Input() profileName:string = '';
    @Input() showCuratedList:Boolean = false;

    constructor(private fourD:FourDInterface, private log:LogService) {
    }

    /**
     * Starting up... load all Recommendations for the current User or Profile
     */
    ngAfterViewInit() {
        this.controlList.model = ViewerContentEx;
        this.refreshList();
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

    /**
     * Refresh Recommendations list
     */
        refreshList() {
        this.currentRecommendation = 'your viewer/rating profile';
        let query = {custom:'MGSEFilterViewerContent', tableName:'ViewerContent', filter:'recommend', userID:FourDInterface.currentUserID};
        if (this.profileID && this.profileID > 0) {
            query['profileID']=this.profileID;
            this.currentRecommendation = this.profileName;
        } 

        //this.log.debug('query:'+queryType);
        this.controlList.getRecords(query,
                                    [ViewerContent.kRecordID, ViewerContent.kFeatureID, ViewerContent.kUserID,
                                    Features.kIMDBTitle,Features.kPosterURL, 
                                    ViewerContent.kMGCCI, ViewerContent.kMGEQI, ViewerContent.kMGPAI, 
                                    ViewerContent.kMGPEI, ViewerContent.kMGPVR, ViewerContent.kMGNQI, 
                                    ViewerContent.kFeedback_Content, ViewerContent.kFeedback_Style, ViewerContent.kFeedback_Theme,
                                    ViewerContent.kFeedback_Narrative, ViewerContent.kFeedback_Execution],
                                    0, -1, '','<'+ViewerContent.kMGPVR);


    }

    /**
     * let user select a curated profile 
     */
    useCurated() {
        var profs:FourDCollection = new FourDCollection();
        profs.model = TasteProfiles;
        profs.getRecords({query:[TasteProfiles.kOrigin + ';=;Curator']}, [TasteProfiles.kProfileID, TasteProfiles.kName])
        .then(recs => {
            this.curatedProfiles = [{ProfileID:0, Name:'Your Viewer Profile'}].concat(profs.models);
            this.showCuratedList = true;
        });
    }

    /**
     * Show Curated Profile Recommendations
     */
    selectCurated(itemIndex) {
        this.profileID = this.curatedProfiles[itemIndex].ProfileID;
        this.profileName = this.curatedProfiles[itemIndex].Name;
        this.showCuratedList = false;
        this.refreshList();
    }
}
