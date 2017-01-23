import { Features, Series, Seasons, Companies, ContentProfileEx } from '../index';

export class FeaturesEx extends Features {
    fields: Array<any> = [
        { name: 'ProdCompany', longname: Companies.kShortName, type: 'text', related: true },
        { name: 'SeriesName', longname: Series.kIMDBTitle, type: 'text', related: true },
        { name: 'SeasonName', longname: Seasons.kIMDBTitle, type: 'text', related: true },
        { name: 'contentProfileList', subTable: new ContentProfileEx(), joinFK: 'ContentProfile.FeatureID', joinPK: 'Features.FeatureId' }
    ].concat(new Features().fields);

    // related fields
    get ProdCompany(): string { return this.get('ProdCompany'); }
    set ProdCompany(v: string) { this.set('ProdCompany', v); }

    get SeriesName(): string { return this.get('SeriesName'); }
    set SeriesName(v: string) { this.set('SeriesName', v); }

    get SeasonName(): string { return this.get('SeasonName'); }
    set SeasonName(v: string) { this.set('SeasonName', v); }

    // children records
    get contentProfileList(): Array<ContentProfileEx> {
        return this.get('contentProfileList');
    }
    set contentProfileList(v: Array<ContentProfileEx>) { this.set('contentProfileList', v); }

}

