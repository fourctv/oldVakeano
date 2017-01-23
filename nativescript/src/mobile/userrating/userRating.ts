import { Component, Input, OnInit, ChangeDetectionStrategy, ViewContainerRef } from '@angular/core';
import { LogService } from '../../app/shared/core/index';

import { openUrl } from "utils/utils";
import { SwipeGestureEventData, SwipeDirection } from "ui/gestures";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular";

import { FeatureRating} from './featureRating';

import { FourDCollection, FourDInterface } from '../../app/shared/js44D/index';

import { Features } from '../../app/shared/moviegenome/index';

@Component({
    moduleId: module.id,
    selector: 'userrating',
    templateUrl: 'userRating.html' ,
    styles: [`
        .icon {
        font-family: 'FontAwesome';
        font-size: 24;
        }
   `],
    changeDetection: ChangeDetectionStrategy.Default
})

export class UserRating implements OnInit {
           
    @Input() currentUser:number = FourDInterface.currentUserID;
    
    @Input() controlList:FourDCollection = new FourDCollection();
    @Input() isLoading = false;


    constructor(private fourD:FourDInterface, private log:LogService, private modalService: ModalDialogService, private vref:ViewContainerRef) {
    }

    /**
     * Starting up... load all Recommendations for the current User or Profile
     */
    ngOnInit() {
        this.isLoading = true;
        this.controlList.model = Features;
        this.refreshList();
    }


    /**
     * Rate a feature, called from the stars under a movie poster
     */
    rateThis(feature:Features, stars:number) {
        let body = {type: 'Feature', 
                    contentID: feature.FeatureId, 
                    rating: stars, 
                    viewer: this.currentUser};
        this.fourD.call4DRESTMethod('MGLErestUpdateViewerProfile', body)
        .subscribe(result => {
            let response = result.json();
            if (response.result === 'OK') {
                this.removeFeature(feature);
            } else alert('Error:'+response.message);
        }, error => {this.log.debug(error);alert('Error:'+error);});
           
    }
    
    //
    // handle user swipe on a row
    //
    onSwipe(event:SwipeGestureEventData, item:Features) {
      this.log.debug('swipe:'+event.direction+', item:'+item.IMDBTitle);
        
        switch (event.direction) {
            case SwipeDirection.left:
                this.rateThis(item, 1);
                break;
        
            case SwipeDirection.right:
                let options: any = {
                        context: { feature: item },
                        fullscreen: true,
                        viewContainerRef: this.vref
                    };

                this.modalService.showModal(FeatureRating, options)
                    .then (() => {
                        this.removeFeature(item);
                    });
                break;

       }
       
        
    }

    /**
     * remove feature from the list
     */
    removeFeature(feature:Features) {
        let list:Array<Features> = this.controlList.models;
        this.controlList.models = list.filter((item) => {return item.FeatureId !== feature.FeatureId;});
    }

 
    refreshList() {
        this.controlList.getRecords('<criteria method="MGSEFilterViewerContent" tableName="Features" filter="control" userID="'+this.currentUser.toString()+'"/>',
            [Features.kIMDBID, Features.kIMDBTitle,Features.kPosterURL, Features.kFeatureId,
            Features.kProdYear, Features.kFeatureCast, Features.kDirectorsList])
            .then(recs => {
                this.log.debug('length:'+recs.length);
                if (recs.length > 0) {
                     this.isLoading = false;
                 }
             });
    }

    showIMDB(currentFeature:any ) {
        openUrl("http://www.imdb.com/title/"+currentFeature.IMDBID);
    }

 
}
