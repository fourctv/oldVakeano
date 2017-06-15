// angular
import { NgModule } from '@angular/core';

import { GenomeMapListDialog } from './genomeMapListDialog';
import { GenomeMapListApp } from './genomeMapList';
import { GenomeMapInfoDialog } from './genomeMapInfoDialog';
import { GenomeMapQueryBand } from './genomeMapQueryBand';

import { JS44DModule } from '../../modules/js44D/js44D.module';
import { ModalModule } from '../../modules/js44D/modal.module';
import { MGModule } from '../../modules/moviegenome/mg.module';

@NgModule({
  imports: [
      JS44DModule, ModalModule,
      MGModule
      ],
   declarations: [
      GenomeMapListDialog,
      GenomeMapListApp,
      GenomeMapQueryBand,
      GenomeMapInfoDialog
      ],
  entryComponents:[
      GenomeMapListDialog, GenomeMapListApp, GenomeMapInfoDialog, GenomeMapListApp
      ]
})

export class GenomeMapListModule { }
