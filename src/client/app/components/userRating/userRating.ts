import { Component, Input } from '@angular/core';

import { Http } from '@angular/http';

import { FourDCollection, FourDInterface } from '../../shared/js44D/index';

import { Features } from '../../shared/moviegenome/index';

@Component({
    moduleId: module.id,
    selector: 'user-rating',
    templateUrl : 'userRating.html',
    styleUrls : ['userRating.css']
})

export class UserRating {     

    @Input() currentUser:number = 0;
    @Input() currentProfile:number = 0;
    @Input() controlList:FourDCollection = new FourDCollection();
    
    constructor(private fourD:FourDInterface, private http:Http) {
        if (!FourDInterface.http) FourDInterface.http = <any>http;
    }

    userHasLoggedIn() {
        this.controlList.model = Features;
        if (!this.currentUser || this.currentUser <= 0) this.currentUser = FourDInterface.currentUserID;
        this.controlList.getRecords('<criteria method="MGSEFilterViewerContent" tableName="Features" filter="control" userID="'+this.currentUser.toString()+'" profileID="'+this.currentProfile.toString()+'"/>',[Features.kFeatureId,Features.kIMDBTitle,Features.kPosterURL]);
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
