// angular
import { NgModule } from '@angular/core';

import { UserRatingAppDialog } from './userRatingAppdialog';
import { UserRating } from './userRating';
import { UserRatingDialog } from './userRatingDialog';

import { JS44DModule } from '../../modules/js44D/js44D.module';
import { ModalModule } from '../../modules/js44D/modal.module';
import { MGModule } from '../../modules/moviegenome/mg.module';

@NgModule({
    imports: [
        JS44DModule, ModalModule,
        MGModule
    ],
    declarations: [
        UserRatingAppDialog,
        UserRating,
        UserRatingDialog
    ],
    entryComponents: [
        UserRatingAppDialog, UserRatingDialog, UserRating
    ]
})

export class UserRatingModule { }
