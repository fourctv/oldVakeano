import { Component, Input, EventEmitter, Output, ElementRef } from '@angular/core';

import { FourDInterface } from '../../shared/js44D/js44D/JSFourDInterface';

import {  GenomeModel, GenomeMap, TasteProfiles, TasteProfilesEx, ProfileGenes, ProfileGenesEx } from '../../shared/moviegenome/index';

@Component({
    moduleId: module.id,
    selector: 'edit-taste-profile',
    templateUrl: 'editTasteProfile.html',
    styleUrls: ['editTasteProfile.css']
})


export class EditTasteProfile {
    @Input() public currentRecord: TasteProfilesEx;

    @Input() public genomeModel: GenomeModel = new GenomeModel();

    @Output() public profileUpdated:EventEmitter<any> = new EventEmitter();

    constructor (private fourD:FourDInterface, private elementRef: ElementRef) {}


    // get this gene's current value from the Content Profile
    getGeneValue(gene: GenomeMap): number {
        if (this.currentRecord.isRecordLoaded()) {
            let index = this.currentRecord.profileGenesList.find((item, index, obj) => { return (item.GeneID === gene.GeneId && item.ParentVector !== 'ContentCluster'); });
            return (index) ? parseInt(index.CoordinateValue) : 0;
        }

        return 0;
    }

    // get this gene's display class (yes or no) from the Content Profile
    getGeneIcon(gene: GenomeMap): string {
        if (this.currentRecord.isRecordLoaded()) {
            let list:Array<any> = this.currentRecord.profileGenesList;
            let index = list.find((item, index, obj) => { return (item.GeneID === gene.GeneId && item.ParentVector !== 'ContentCluster'); });
            if (index) return (index.CoordinateValue === '1') ? 'yes-icon' : 'no-icon';
        }

        return 'no-icon';
    }

    // get this gene's rating interpretation
    getGeneRatingInterpretation(gene): string {
        if (this.currentRecord.isRecordLoaded() && gene.AcceptedValuesList && gene.AcceptedValuesList !== '') {
            let list:Array<any> = this.currentRecord.profileGenesList;
            let index = list.find((item, index, obj) => { return (item.GeneID === gene.GeneId && item.ParentVector !== 'ContentCluster'); });
            return (index) ? this.genomeModel.getRatingToolTip(gene.AcceptedValuesList, index.CoordinateValue) : '';
        } else return '';
    }

    // get this gene tooltip from its associated
    getGeneToolTip(gene: GenomeMap, rate: string): string {
        return (gene.AcceptedValuesList && gene.AcceptedValuesList !== '') ? this.genomeModel.getRatingToolTip(gene.AcceptedValuesList, rate) : '';
    }

    // checks if this gene's star rating matches the star value
    doesGeneStarRatingMatch(gene: GenomeMap, rate: string): boolean {
        if (this.currentRecord.isRecordLoaded()) {
            let list:Array<any> = this.currentRecord.profileGenesList;
            let index = list.find((item, index, obj) => { return (item.GeneID === gene.GeneId && item.ParentVector !== 'ContentCluster'); });
            if (index && index.CoordinateValue === rate) return true;
        }

        return false;
    }

    // for binary Genes, toggle on or off
    toggleGene(gene: GenomeMap) {
        let list:Array<any> = this.currentRecord.profileGenesList;
        let index = list.find((item, index, obj) => { return (item.GeneID === gene.GeneId && item.ParentVector !== 'ContentCluster'); });
        if (index) {
            index.CoordinateValue = (index.CoordinateValue === '0') ? '1' : '0';
            let geneRec: ProfileGenes = new ProfileGenes();
            kendo.ui.progress($(this.elementRef.nativeElement), true); // show loading progress icon
            geneRec.getRecord(null, index.RecordID.toString())
                .then(rec => {
                    geneRec.CoordinateValue = index.CoordinateValue;
                    // set some default values for now, may need to change this in the future
                    geneRec.Frequency = 1;
                    geneRec.Weight = 5;
                    geneRec.WeightedRating = 5;
                    // set some default values for now, may need to change this in the future
                    geneRec.updateRecord().then(() => { this.recalculateVectors(gene); });
                });
        } else {
            // new gene, add to content profile
            let newGene: ProfileGenesEx = new ProfileGenesEx();
            newGene.ProfileID = this.currentRecord.ProfileID;
            newGene.GeneID = gene.GeneId;
            newGene.CoordinateValue = '1';
             // set some default values for now, may need to change this in the future
            newGene.Frequency = 1;
            newGene.Weight = 5;
            newGene.WeightedRating = 5;
             // set some default values for now, may need to change this in the future
            kendo.ui.progress($(this.elementRef.nativeElement), true); // show loading progress icon
            newGene.insertRecord().then(() => {
                newGene.GeneName = gene.GeneName;
                newGene.GeneVector = gene.Vector;
                newGene.GeneCluster = gene.Cluster;
                this.currentRecord.profileGenesList.push(newGene);
                this.recalculateVectors(gene);
            });
        }
    }

    // for star rating Genes, set the rate
    setGeneRating(gene: GenomeMap, rate: string) {
        let list:Array<any> = this.currentRecord.profileGenesList;
        let cumValue = 0;
        if (gene.Vector === 'Content') {
            if (rate < '3') cumValue = -5;
            if (rate > '3') cumValue = 5;
        }
        let index = list.find((item, index, obj) => { return (item.GeneID === gene.GeneId && item.ParentVector !== 'ContentCluster'); });
        if (index) {
            index.CoordinateValue = rate;
            let geneRec: ProfileGenes = new ProfileGenes();
            kendo.ui.progress($(this.elementRef.nativeElement), true); // show loading progress icon
            geneRec.getRecord(null, index.RecordID.toString())
                .then(rec => {
                    geneRec.CoordinateValue = index.CoordinateValue;
                    geneRec.CumValue = cumValue;
                     // set some default values for now, may need to change this in the future
                    geneRec.Frequency = 1;
                    geneRec.Weight = 5;
                    geneRec.WeightedRating = 5;
                    // set some default values for now, may need to change this in the future
                   geneRec.updateRecord().then(() => { this.recalculateVectors(gene); });
                });
        } else {
            // new gene, add to content profile
            let newGene: ProfileGenesEx = new ProfileGenesEx();
            newGene.ProfileID = this.currentRecord.ProfileID;
            newGene.GeneID = gene.GeneId;
            newGene.CoordinateValue = rate;
            newGene.CumValue = cumValue;
            // set some default values for now, may need to change this in the future
            newGene.Frequency = 1;
            newGene.Weight = 5;
            newGene.WeightedRating = 5;
             // set some default values for now, may need to change this in the future
            kendo.ui.progress($(this.elementRef.nativeElement), true); // show loading progress icon
            newGene.insertRecord().then(() => {
                newGene.GeneName = gene.GeneName;
                newGene.GeneVector = gene.Vector;
                newGene.GeneCluster = gene.Cluster;
                this.currentRecord.profileGenesList.push(newGene);
                this.recalculateVectors(gene);
            });
        }
    }

    // call 4D to recalculate Vectors...
    recalculateVectors(gene: GenomeMap) {
        let body = {
            profileID: this.currentRecord.ProfileID,
            vector: gene.Vector
        };
        kendo.ui.progress($(this.elementRef.nativeElement), true); // show loading progress icon
        this.fourD.call4DRESTMethod('MGLErestViewerProfileToVectors', body)
            .subscribe(result => {
                kendo.ui.progress($(this.elementRef.nativeElement), false); // hide loading progress icon
                let response = result.json();
                if (response.result !== 'OK') alert('Error:' + response.message);
                this.profileUpdated.emit();
            }, error => { console.log(error); alert('Error:' + error); });

    }
}
