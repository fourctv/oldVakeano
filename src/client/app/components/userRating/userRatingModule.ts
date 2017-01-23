// angular
import { NgModule } from '@angular/core';

import { UserRating} from './userRating';
import { UserRatingDialog} from './userRatingDialog';

import { JS44DModule } from '../../shared/js44D/js44D.module';
import { MGModule } from '../../shared/moviegenome/mg.module';

@NgModule({
  imports: [
      JS44DModule,
      MGModule
      ],
   declarations: [ 
      UserRating,
      UserRatingDialog
      ],
  entryComponents:[
      UserRatingDialog
      ]
})

export class UserRatingModule { }
