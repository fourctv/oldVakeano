// angular
import { NgModule } from '@angular/core';

import { UserRecommendations} from './userRecommendations';
import { UserRecommendationsDialog} from './userRecommendationsDialog';

import { JS44DModule } from '../../modules/js44D/js44D.module';
import { MGModule } from '../../modules/moviegenome/mg.module';

@NgModule({
  imports: [
      JS44DModule,
      MGModule
      ],
   declarations: [ 
      UserRecommendations,
      UserRecommendationsDialog
      ],
  entryComponents:[
      UserRecommendationsDialog
      ]
})

export class UserRecommendationsModule { }
