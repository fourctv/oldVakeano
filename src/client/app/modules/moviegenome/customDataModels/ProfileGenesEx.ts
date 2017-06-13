import { ProfileGenes, GenomeMap } from '../index';

export class ProfileGenesEx extends ProfileGenes {
    fields: Array<any> = [
        { name: 'GeneName', longname: GenomeMap.kGeneName, type: 'text', related: true },
        { name: 'GeneVector', longname: GenomeMap.kVector, type: 'text', related: true },
        { name: 'GeneCluster', longname: GenomeMap.kCluster, type: 'text', related: true }
    ].concat(new ProfileGenes().fields);

    // related fields
    get GeneName(): string { return this.get('GeneName'); }
    set GeneName(v: string) { this.set('GeneName', v); }

    get GeneVector(): string { return this.get('GeneVector'); }
    set GeneVector(v: string) { this.set('GeneVector', v); }

    get GeneCluster(): string { return this.get('GeneCluster'); }
    set GeneCluster(v: string) { this.set('GeneCluster', v); }

}

