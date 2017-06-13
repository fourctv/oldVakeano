// angular
import { NgModule } from '@angular/core';

import { GenomeMapListApp } from './genomeMapList';
import { GenomeMapInfoDialog } from './genomeMapInfoDialog';
import { GenomeMapQueryBand } from './genomeMapQueryBand';

import { JS44DModule } from '../../modules/js44D/js44D.module';
import { MGModule } from '../../modules/moviegenome/mg.module';

@NgModule({
  imports: [
      JS44DModule,
      MGModule
      ],
   declarations: [ 
      GenomeMapListApp,
      GenomeMapQueryBand,
      GenomeMapInfoDialog
      ],
  entryComponents:[
      GenomeMapInfoDialog
      ]
})

export class GenomeMapListModule { }
