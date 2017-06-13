import { ViewerContent, Features } from '../index';

export class ViewerContentEx extends ViewerContent {
    fields: Array<any> = [
        { name: 'IMDBID', longname: Features.kIMDBID, type: 'text', related: true },
        { name: 'IMDBTitle', longname: Features.kIMDBTitle, type: 'text', related: true },
        { name: 'PosterURL', longname: Features.kPosterURL, type: 'text', related: true },
        { name: 'ProdYear', longname: Features.kProdYear, type: 'text', related: true },
        { name: 'DirectorsList', longname: Features.kDirectorsList, type: 'text', related: true }
    ].concat(new ViewerContent().fields);

    // related fields
    get IMDBID(): string { return this.get('IMDBID'); }
    set IMDBID(v: string) { this.set('IMDBID', v); }

    get IMDBTitle(): string { return this.get('IMDBTitle'); }
    set IMDBTitle(v: string) { this.set('IMDBTitle', v); }

    get PosterURL(): string { return this.get('PosterURL'); }
    set PosterURL(v: string) { this.set('PosterURL', v); }

    get ProdYear(): number { return this.get('ProdYear'); }
    set ProdYear(v: number) { this.set('ProdYear', v); }

    get DirectorsList(): string { return this.get('DirectorsList'); }
    set DirectorsList(v: string) { this.set('DirectorsList', v); }

    // calculated fields
    get FullResPosterURL(): string {
        return this.get('PosterURL');
        /* for now didsable this, there seems to be some problems with IMDB 
        let poster:string = this.get('PosterURL');
        if (poster && poster.indexOf('imdb.com')>0) {
            let marker = poster.indexOf("._");
            return (marker>0)?poster.substr(0,marker)+ '._V1_UX512_.jpg':poster;
        } else return poster;
        */
    }
}
