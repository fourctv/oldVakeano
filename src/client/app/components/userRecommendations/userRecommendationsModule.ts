// angular
import { NgModule } from '@angular/core';

import { UserRecommendationsAppDialog } from './userRecommendationsAppDialog';
import { UserRecommendations } from './userRecommendations';
import { UserRecommendationsDialog } from './userRecommendationsDialog';

import { JS44DModule } from '../../modules/js44D/js44D.module';
import { ModalModule } from '../../modules/js44D/modal.module';
import { MGModule } from '../../modules/moviegenome/mg.module';

@NgModule({
    imports: [
        JS44DModule, ModalModule,
        MGModule
    ],
    declarations: [
        UserRecommendationsAppDialog,
        UserRecommendations,
        UserRecommendationsDialog
    ],
    entryComponents: [
        UserRecommendationsAppDialog, UserRecommendationsDialog, UserRecommendations
    ]
})

export class UserRecommendationsModule { }
