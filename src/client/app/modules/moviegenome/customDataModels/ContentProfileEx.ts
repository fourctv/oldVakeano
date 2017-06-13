import { ContentProfile, GenomeMap, ShellUsers } from '../index';

export class ContentProfileEx extends ContentProfile {
    fields: Array<any> = [
        { name: 'GeneName', longname: GenomeMap.kGeneName, type: 'text', related: true },
        { name: 'GeneVector', longname: GenomeMap.kVector, type: 'text', related: true },
        { name: 'GeneCluster', longname: GenomeMap.kCluster, type: 'text', related: true },
        { name: 'CuratorName', longname: ShellUsers.kUserName, type: 'text', related: true }
    ].concat(new ContentProfile().fields);

    // related fields
    get GeneName(): string { return this.get('GeneName'); }
    set GeneName(v: string) { this.set('GeneName', v); }

    get GeneVector(): string { return this.get('GeneVector'); }
    set GeneVector(v: string) { this.set('GeneVector', v); }

    get GeneCluster(): string { return this.get('GeneCluster'); }
    set GeneCluster(v: string) { this.set('GeneCluster', v); }

    get CuratorName(): string { return this.get('CuratorName'); }
    set CuratorName(v: string) { this.set('CuratorName', v); }

}

