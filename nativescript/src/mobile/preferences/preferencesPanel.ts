import { Component, Input, Output, ChangeDetectionStrategy, ViewChild, EventEmitter, OnInit } from '@angular/core';
import { LogService } from '../../app/shared/core/index';
import { RouterExtensions } from 'nativescript-angular';

import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";
import { SideDrawerLocation } from "nativescript-telerik-ui/sidedrawer";
import { isAndroid, isIOS } from 'platform';

@Component({
    moduleId: module.id,
    selector: 'preferencepanel',
    template: `
    <ActionBar class="action-bar" [title]="pageTitle">
        <ActionItem (tap)="preferences()" icon="~/assets/icons/mobile_menu.png" ios.position="left" android.position="actionBar" android.systemIcon="ic_menu_manage"></ActionItem>
    </ActionBar>
    <RadSideDrawer [drawerLocation]="currentLocation">
        <StackLayout tkDrawerContent class="sideStackLayout" style="background-color: lightgray;" (swipe)="doSwipe($event)" verticalAlignment="top" marginTop="5" height="185" width="250" padding="10">
            <StackLayout class="sideTitleStackLayout">
                <Label text="Vakeano" class="text-center h2"></Label>
            </StackLayout>

            <StackLayout class="hr-light"></StackLayout>
            <StackLayout class="hr-dark"></StackLayout>
            <StackLayout class="hr-light"></StackLayout>

            <StackLayout class="sideStackLayout">
                <Label text="My Recommendations" class="p-t-5" (tap)="closeDrawer();showRecommendations()"></Label>
                <Label text="My Recommendation List" class="p-t-5" (tap)="closeDrawer();showList()"></Label>
                <Label text="Use Curated Profile..." class="p-t-5" (tap)="closeDrawer();useCuratedProfile()"></Label>
                <Label text="I'm In the Mood for..." class="p-t-5" style="font-style: italic;color: gray;" (tap)="closeDrawer();buildProfile()"></Label>
                
                <StackLayout class="hr-dark"></StackLayout>
                <StackLayout class="hr-dark"></StackLayout>

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

export class PreferencePanel implements OnInit {

    @Input() pageTitle:string = '';

    @Input() currentLocation = SideDrawerLocation.Left;

    @Output() public onSwipe: EventEmitter<any> = new EventEmitter();

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;


    constructor(private log:LogService, private router:RouterExtensions) {
       
    }

    ngOnInit() {
        // need to set drawer location because on iOS it show on the left, but on android it comes up on the right
        if (isAndroid) this.currentLocation = SideDrawerLocation.Right;
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
        this.log.debug('swipe:'+event.direction);
        this.onSwipe.emit(event);
    }

    login() {
        this.router.navigate(['/login'], { clearHistory:true });
    }

    useCuratedProfile() {
        this.router.navigate(['/curatedProfile'], { })
    }

    buildProfile() {
        this.router.navigate(['/profileBuildingPage'], { });
    }
}
