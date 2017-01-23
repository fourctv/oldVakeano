import { Component, Input, Output, ChangeDetectionStrategy, ViewChild, EventEmitter } from '@angular/core';
import { LogService } from '../../app/shared/core/index';
import { RouterExtensions } from 'nativescript-angular';

import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";

@Component({
    moduleId: module.id,
    selector: 'preferencepanel',
    template: `
    <ActionBar class="action-bar" [title]="pageTitle">
        <ActionItem (tap)="preferences()" icon="~/assets/icons/mobile_menu.png" ios.position="left" android.position="actionBar" android.systemIcon="ic_menu_manage"></ActionItem>
    </ActionBar>
    <RadSideDrawer>
        <StackLayout tkDrawerContent class="sideStackLayout" style="background-color: lightgray;" (swipe)="closeDrawer()" verticalAlignment="top" marginTop="5" height="180" width="250" padding="10">
            <StackLayout class="sideTitleStackLayout">
                <Label text="Movie Genome"></Label>
            </StackLayout>

            <StackLayout class="hr-light"></StackLayout>

            <StackLayout class="sideStackLayout">
                <Label text="Show Recommendations" class="p-t-5" (tap)="closeDrawer();showRecommendations()"></Label>
                <Label text="Show Recommendations List" class="p-t-5" (tap)="closeDrawer();showList()"></Label>
                <Label text="Use Curated Profile..." class="p-t-5" style="font-style: italic;color: gray;" (tap)="closeDrawer();buildProfile()"></Label>
                <Label text="I'm In the Mood for..." class="p-t-5" style="font-style: italic;color: gray;"></Label>
                
                <StackLayout class="hr-light" style="paddingTop:5;paddingBottom:5;"></StackLayout>

                <Label text="Logout" class="p-t-5" (tap)="closeDrawer();login()"></Label>

            </StackLayout>
        </StackLayout>

        <StackLayout tkMainContent style="background-color: deepskyblue;" (swipe)="doSwipe($event)" width="100%" height="100%">
                <ng-content></ng-content>
         </StackLayout>
    </RadSideDrawer>        
`,
    changeDetection: ChangeDetectionStrategy.Default
})

export class PreferencePanel  {

    @Input() pageTitle:string = '';

    @Output() public onSwipe: EventEmitter<any> = new EventEmitter();

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;


    constructor(private log:LogService, private router:RouterExtensions) {
       
    }

    showRecommendations() {
        this.router.navigate(['/userRecommendationPage'], { clearHistory:true });
    }
    showList() {
        this.router.navigate(['/userRecommendations'], { clearHistory:true });
    }

    preferences() {
        this.drawerComponent.sideDrawer.toggleDrawerState();
    }

    closeDrawer() {
        this.drawerComponent.sideDrawer.closeDrawer();
    }

    doSwipe(event:any) {
        this.onSwipe.emit(event);
    }

    login() {
        this.router.navigate(['/login'], { clearHistory:true });
    }

    buildProfile() {
        this.router.navigate(['/profileBuildingPage'], { });
    }
}
