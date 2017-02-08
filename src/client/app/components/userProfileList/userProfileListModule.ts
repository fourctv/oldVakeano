// angular
import { NgModule } from '@angular/core';

import { UserProfileListApp } from './userProfileList';
import { ProfileGenesInfo } from './profileGenesInfo';
import { UserProfileInfo } from './userProfileInfo';
import { UserProfileInfoDialog } from './userProfileInfoDialog';
import { UserProfileQueryBand } from './userProfileQueryBand';
import { ViewerContentInfo } from './viewerContentInfo';
import { ProfileRecommendationsInfo } from './profileRecommendationsInfo';
import { EditTasteProfile } from './editTasteProfile';

import { ProfileGenesInfoDialog } from './profileGenesInfoInfoDialog';

import { UserRatingModule } from '../userRating/userRatingModule';
import { UserRecommendationsModule } from '../userRecommendations/userRecommendationsModule';

import { JS44DModule } from '../../shared/js44D/js44D.module';
import { MGModule } from '../../shared/moviegenome/mg.module';

@NgModule({
  imports: [
      JS44DModule,
      MGModule,
      UserRatingModule,
      UserRecommendationsModule
      ],
  declarations: [ 
      UserProfileListApp,
      UserProfileQueryBand,
      ProfileGenesInfo,
      UserProfileInfoDialog, UserProfileInfo,
      ViewerContentInfo,
      ProfileRecommendationsInfo,
      EditTasteProfile,
      ProfileGenesInfoDialog
      ],
  entryComponents:[
      UserProfileInfoDialog,
      ProfileGenesInfoDialog
      ]
})

export class UserProfileListModule { }
