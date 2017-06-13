// angular
import { NgModule } from '@angular/core';

import { FeatureListApp } from './featureList';
import { FeatureQueryBand } from './featureQueryBand';
import { FeatureInfoDialog } from './featureInfoDialog';
import { FeatureInfo } from './featureInfo';
import { EditProfile } from './editProfile';
import { ContentProfileInfo } from './contentProfileInfo';
import { AnalyzeFeatureComponent } from './analyzeFeature';

import { JS44DModule } from '../../modules/js44D/js44D.module';
import { MGModule } from '../../modules/moviegenome/mg.module';

@NgModule({
  imports: [
      JS44DModule,
      MGModule
      ],
   declarations: [ 
      FeatureListApp,
      FeatureQueryBand,
      FeatureInfo,
      EditProfile,
      AnalyzeFeatureComponent,
      ContentProfileInfo,
      FeatureInfoDialog
      ],
  entryComponents:[
      FeatureInfoDialog,
      AnalyzeFeatureComponent
      ]
})

export class FeatureListModule { }
