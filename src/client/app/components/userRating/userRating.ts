import { Component, Input, AfterViewInit } from '@angular/core';

import { FourDInterface } from '../../modules/js44D/js44D/JSFourDInterface';
import { FourDCollection } from '../../modules/js44D/js44D/JSFourDCollection';

import { Features } from '../../modules/moviegenome/index';

@Component({
    moduleId: module.id,
    selector: 'user-rating',
    templateUrl : 'userRating.html',
    styleUrls : ['userRating.css']
})

export class UserRating implements AfterViewInit {     

    @Input() currentUser:number = 0;
    @Input() currentProfile:number = 0;
    @Input() controlList:FourDCollection = new FourDCollection();
    
    constructor(private fourD:FourDInterface) {
    }

    ngAfterViewInit() {
        this.controlList.model = Features;
        if (!this.currentUser || this.currentUser <= 0) this.currentUser = FourDInterface.currentUserID;
        this.controlList.getRecords(<any>{custom:'MGSEFilterViewerContent', tableName:'Features', filter:'control', userID:this.currentUser, profileID:this.currentProfile},[Features.kFeatureId,Features.kIMDBTitle,Features.kPosterURL]);
    }
    
    rateThis(feature:Features, stars:number) {
        let body = {type: 'Feature', 
                    contentID: feature.FeatureId, 
                    rating: stars, 
                    viewer: this.currentUser,
                    profile: this.currentProfile};
        this.fourD.call4DRESTMethod('MGLErestUpdateViewerProfile', body)
        .subscribe(result => {
            let response = result.json();
            if (response.result === 'OK') {
                let list:Array<Features> = this.controlList.models;
                this.controlList.models = list.filter((item) => {return item.FeatureId !== feature.FeatureId;});
            }  else alert('Error:'+response.message);
        }, error => {console.log(error);alert('Error:'+error);});
           
    }

}
