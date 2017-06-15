// angular
import { NgModule } from '@angular/core';

import { UserProfileListDialog } from './userProfileListDialog';
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

import { JS44DModule } from '../../modules/js44D/js44D.module';
import { ModalModule } from '../../modules/js44D/modal.module';
import { MGModule } from '../../modules/moviegenome/mg.module';

@NgModule({
  imports: [
      JS44DModule, ModalModule,
      MGModule,
      UserRatingModule,
      UserRecommendationsModule
      ],
  declarations: [
      UserProfileListDialog, 
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
      UserProfileListDialog, UserProfileInfoDialog, UserProfileListApp,
      ProfileGenesInfoDialog
      ]
})

export class UserProfileListModule { }
