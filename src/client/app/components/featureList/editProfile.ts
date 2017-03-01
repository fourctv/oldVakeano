import { Component, Input } from '@angular/core';

import { FourDInterface } from '../../shared/js44D/js44D/JSFourDInterface';

import { FeaturesEx, GenomeModel, GenomeMap, ContentProfile, ContentProfileEx } from '../../shared/moviegenome/index';

@Component({
    moduleId: module.id,
    selector: 'edit-profile',
    templateUrl: 'editProfile.html',
    styleUrls: ['editProfile.css']
})


export class EditProfile {
    @Input() public record: FeaturesEx;

    @Input() public genomeModel: GenomeModel = new GenomeModel();

    constructor (private fourD:FourDInterface) {}

    // check if a Gene applies to the current Feature
    isGeneApplicable(gene: GenomeMap): boolean {
        if (this.record.isRecordLoaded()) {
            let validItens: Array<string> = [];
            if (gene.AppActingType && gene.AppActingType !== '') {
                validItens = gene.AppActingType.split('/');
                if (validItens.indexOf(this.record.ActingType) < 0) return false; // gene does not apply to this feature's acting type
            }
            if (gene.AppNarrativeType && gene.AppNarrativeType !== '') {
                validItens = gene.AppNarrativeType.split('/');
                if (validItens.indexOf(this.record.NarrativeType) < 0) return false; // gene does not apply to this feature's narrative type
            }

            return true;
        }

        return false;
    }

    // get this gene's current value from the Content Profile
    getGeneValue(gene: GenomeMap): number {
        if (this.record.isRecordLoaded()) {
            let index = this.record.contentProfileList.find((item, index, obj) => { return item.GeneID === gene.GeneId; });
            return (index) ? parseInt(index.CoordinateValue) : 0;
        }

        return 0;
    }

    // get this gene's display class (yes or no) from the Content Profile
    getGeneIcon(gene: GenomeMap): string {
        if (this.record.isRecordLoaded()) {
            let list:Array<any> = this.record.contentProfileList;
            let index = list.find((item, index, obj) => { return item.GeneID === gene.GeneId; });
            if (index) return (index.CoordinateValue === '1') ? 'yes-icon' : 'no-icon';
        }

        return 'no-icon';
    }

    // get this gene's rating interpretation
    getGeneRatingInterpretation(gene): string {
        if (this.record.isRecordLoaded() && gene.AcceptedValuesList && gene.AcceptedValuesList !== '') {
            let list:Array<any> = this.record.contentProfileList;
            let index = list.find((item, index, obj) => { return item.GeneID === gene.GeneId; });
            return (index) ? this.genomeModel.getRatingToolTip(gene.AcceptedValuesList, index.CoordinateValue) : '';
        } else return '';
    }

    // get this gene tooltip from its associated
    getGeneToolTip(gene: GenomeMap, rate: string): string {
        return (gene.AcceptedValuesList && gene.AcceptedValuesList !== '') ? this.genomeModel.getRatingToolTip(gene.AcceptedValuesList, rate) : '';
    }

    // checks if this gene's star rating matches the star value
    doesGeneStarRatingMatch(gene: GenomeMap, rate: string): boolean {
        if (this.record.isRecordLoaded()) {
            let list:Array<any> = this.record.contentProfileList;
            let index = list.find((item, index, obj) => { return item.GeneID === gene.GeneId; });
            if (index && index.CoordinateValue === rate) return true;
        }

        return false;
    }

    // for binary Genes, toggle on or off
    toggleGene(gene: GenomeMap) {
        let list:Array<any> = this.record.contentProfileList;
        let index = list.find((item, index, obj) => { return item.GeneID === gene.GeneId; });
        if (index) {
            index.CoordinateValue = (index.CoordinateValue === '0') ? '1' : '0';
            let geneRec: ContentProfile = new ContentProfile();
            geneRec.getRecord(null, index.RecordID.toString())
                .then(rec => {
                    geneRec.CoordinateValue = index.CoordinateValue;
                    geneRec.updateRecord().then(() => { this.recalculateVectors(gene); });
                });
        } else {
            // new gene, add to content profile
            let newGene: ContentProfileEx = new ContentProfileEx();
            newGene.FeatureID = this.record.FeatureId;
            newGene.GeneID = gene.GeneId;
            newGene.CuratorID = FourDInterface.currentUserID;
            newGene.CoordinateValue = '1';
            newGene.insertRecord().then(() => {
                this.record.contentProfileList.push(newGene);
                this.recalculateVectors(gene);
            });
        }
    }

    // for star rating Genes, set the rate
    setGeneRating(gene: GenomeMap, rate: string) {
        let list:Array<any> = this.record.contentProfileList;
        let index = list.find((item, index, obj) => { return item.GeneID === gene.GeneId; });
        if (index) {
            index.CoordinateValue = rate;
            let geneRec: ContentProfile = new ContentProfile();
            geneRec.getRecord(null, index.RecordID.toString())
                .then(rec => {
                    geneRec.CoordinateValue = index.CoordinateValue;
                    geneRec.updateRecord().then(() => { this.recalculateVectors(gene); });
                });
        } else {
            // new gene, add to content profile
            let newGene: ContentProfileEx = new ContentProfileEx();
            newGene.FeatureID = this.record.FeatureId;
            newGene.GeneID = gene.GeneId;
            newGene.CuratorID = FourDInterface.currentUserID;
            newGene.CoordinateValue = rate;
            newGene.insertRecord().then(() => {
                this.record.contentProfileList.push(newGene);
                this.recalculateVectors(gene);
            });
        }
    }

    // call 4D to recalculate Vectors...
    recalculateVectors(gene: GenomeMap) {
        let body = {
            type: 'Feature',
            contentID: this.record.FeatureId,
            vector: gene.Vector
        };
        this.fourD.call4DRESTMethod('CPROrestProfileToVectors', body)
            .subscribe(result => {
                let response = result.json();
                if (response.result !== 'OK') alert('Error:' + response.message);
            }, error => { console.log(error); alert('Error:' + error); });

    }
}
