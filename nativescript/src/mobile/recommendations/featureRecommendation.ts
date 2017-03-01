import { Component, Input } from '@angular/core';
import { LogService } from '../../app/shared/core/index';
import { ModalDialogParams } from "nativescript-angular";

import { openUrl } from "utils/utils";
import { SwipeGestureEventData, SwipeDirection } from "ui/gestures";

import { FourDInterface } from '../../app/shared/js44D/js44D/JSFourDInterface';

@Component({
    moduleId: module.id,
    selector: 'modal-content',
    template: `
    <StackLayout verticalAlignment="center" horizontalAlignment="left" (swipe)="onSwipe($event)">
    
        <GridLayout rows="*,auto" marginTop="5">
            <StackLayout row="0" verticalAlignment="center" horizontalAlignment="center">
                <Image [src]='currentFeature.FullResPosterURL'></Image>
            </StackLayout>

            <GridLayout rows="auto,*,auto,auto" row="0" (longPress)="showIMDB()">
                <StackLayout row="0" verticalAlignment="center" horizontalAlignment="center"  marginTop="35">
                    <Label text="\uf087" class="icon" (tap)="rateThis(3)"></Label>
                </StackLayout>

                <DockLayout columns="auto,*,auto" row="1" verticalAlignment="center" marginLeft="5" marginRight="5">
                    <Label dock="left"  text="\uf137" class="icon" (tap)="close('OK')"></Label>
                    <Label dock="right"  text="\uf004" class="icon" (tap)="rateThis(5)" horizontalAlignment="right"></Label>
                </DockLayout>

                <StackLayout row="2" verticalAlignment="center" horizontalAlignment="center" marginBottom="5">
                    <Label text="\uf088" class="icon" (tap)="rateThis(1)"></Label>
                </StackLayout>

                <Label row="3" [text]="currentFeature.IMDBTitle + ' (' + currentFeatureScore() + ')'" textWrap="true" marginLeft="10"></Label>

            </GridLayout>

        </GridLayout>

     </StackLayout>
    `
})
export class FeatureRecommendation {
   @Input() public currentFeature:any;
   stars:string = "\uF006";

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
        this.log.debug('stars:'+stars);
        let body = {type: 'Feature', 
                    contentID: this.currentFeature.FeatureID, 
                    rating: stars, 
                    viewer: this.currentFeature.UserID};
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
                this.close('OK');
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

    currentFeatureScore():string {
        let score = (((this.currentFeature.MGPEI + this.currentFeature.MGPAI) * this.currentFeature.MGCCI)/2 + this.currentFeature.MGEQI+this.currentFeature.MGNQI).toFixed(2);
        return score;
    }


}