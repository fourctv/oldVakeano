import { Component, Input } from '@angular/core';
import { LogService } from '../../app/shared/core/index';
import { ModalDialogParams } from "nativescript-angular";

import { openUrl } from "utils/utils";
import { SwipeGestureEventData, SwipeDirection } from "ui/gestures";

import { FourDInterface } from '../../app/shared/js44D/index';

import { Features } from '../../app/shared/moviegenome/index';

@Component({
     moduleId: module.id,
  selector: 'modal-content',
    template: `
    <StackLayout style="background-color: white;padding:3px;" margin="24" verticalAlignment="center" horizontalAlignment="left" (swipe)="onSwipe($event)">
       <Image [src]='currentFeature.PosterURL' width="128" height="128" marginLeft="5" (tap)="showIMDB()"></Image>
       <StackLayout orientation="vertical" marginTop="15">
        <Label text="IMDB ID:"></Label>
        <Label [text]="currentFeature.IMDBID" textWrap="true" marginLeft="10"></Label>
      </StackLayout>
      <StackLayout orientation="vertical" marginTop="15">
        <Label text="IMDB Title:"></Label>
        <Label [text]="currentFeature.IMDBTitle" textWrap="true" marginLeft="10"></Label>
      </StackLayout>
      <StackLayout orientation="vertical" marginTop="15">
        <Label text="Production Year:"></Label>
        <Label [text]="currentFeature.ProdYear" textWrap="true" marginLeft="10"></Label>
      </StackLayout>
      <StackLayout orientation="vertical" marginTop="15">
        <Label text="Directors:"></Label>
        <Label [text]="currentFeature.DirectorsList" textWrap="true" marginLeft="10"></Label>
      </StackLayout>
      <Label text="You can rate this picture by swiping LEFT if you do not like it. Swipe RIGHT if you LIKE it. Or swipe UP if you LOVE it!" textWrap="true" marginTop="15"></Label>

     <StackLayout orientation="horizontal" marginTop="24" horizontalAlignment="center">
            <Button text="Back" (tap)="close('OK')"></Button>
      </StackLayout>
    </StackLayout>
    `,
    styles: [`
        .icon {
            font-family: 'FontAwesome';
            font-size: 24;
        }
    `]
})
export class FeatureRating {
    @Input() currentUser:number = FourDInterface.currentUserID;
    @Input() public currentFeature:Features;

    constructor(private fourD:FourDInterface, private params: ModalDialogParams, private log:LogService) {
        this.currentFeature = params.context.feature;
    }

    public close(res: string) {
        this.params.closeCallback(res);
    }

    public showIMDB( ) {
        openUrl("http://www.imdb.com/title/"+this.currentFeature.IMDBID);
    }

    public rateThis(stars:number) {
        this.log.debug('stars:'+stars+', for:'+this.currentFeature.FeatureId);
        let body = {type: 'Feature', 
                    contentID: this.currentFeature.FeatureId, 
                    rating: stars, 
                    viewer: this.currentUser};
        this.fourD.call4DRESTMethod('MGLErestUpdateViewerProfile', body)
        .subscribe(result => {
            let response = result.json();
            if (response.result === 'OK') {
                this.close('OK');
            } else alert('Error:'+response.message);
        }, error => {this.log.debug(error);alert('Error:'+error);});
    }

    //
    // handle user swipe on a row
    //
    onSwipe(event:SwipeGestureEventData) {
        switch (event.direction) {
            case SwipeDirection.left:
                this.rateThis(1);
                break;
        
            case SwipeDirection.right:
                this.rateThis(4);
                break;

            case SwipeDirection.up:
                this.rateThis(5);
       }
        
    }


}