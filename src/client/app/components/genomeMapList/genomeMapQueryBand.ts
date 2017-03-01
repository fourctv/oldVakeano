import { Component, Input } from '@angular/core';

import { FourDInterface } from '../../shared/js44D/js44D/JSFourDInterface';

import { GenomeMap } from '../../shared/moviegenome/index';

@Component({
    moduleId: module.id,
    selector: 'genomemap-queryband',
    templateUrl: 'genomeMapQueryBand.html'
})


export class GenomeMapQueryBand {
    //
    // declare quey band fields
    //
    get userIsLoggedIn(): boolean { return FourDInterface.authentication !== undefined && FourDInterface.authentication !== null; }
    @Input() public geneName: string = '';
    @Input() public selectVector: string = '';
    @Input() public selectCluster: string = '';
    @Input() public selectNarrative: string = '';
    @Input() public selectActingType: string = '';

    constructor (private fourD:FourDInterface) {}
    //
    // build 4C-TV query based on items from query band
    //
    public get currentQuery(): any {
        let currQuery = [];

        // Query based on Gene Name
        if (this.geneName && this.geneName !== '') {
            currQuery.push(GenomeMap.kGeneName + ';begins with;' + this.geneName + ';AND');
        }

        // Query based on Gene Vector
        if (this.selectVector && this.selectVector !== '') {
            currQuery.push(GenomeMap.kVector + ';=;' + this.selectVector + ';AND');
        }

         // Query based on Gene Cluster
        if (this.selectCluster && this.selectCluster !== '') {
            currQuery.push(GenomeMap.kCluster+ ';=;' + this.selectCluster + ';AND');
        }
 
          // Query based on Narrative Type
        if (this.selectNarrative && this.selectNarrative !== '') {
            currQuery.push(GenomeMap.kAppNarrativeType+ ';=;' + this.selectNarrative + ';AND');
        }
 
          // Query based on Acting Type
        if (this.selectActingType && this.selectActingType !== '') {
            currQuery.push(GenomeMap.kAppActingType+ ';=;' + this.selectActingType + ';AND');
        }
 
        return {query:currQuery};

    }
}
