import { GenomeMap, ShellLists } from '../index';

export class GenomeModel {
    public themesGenes:Array<GenomeMap> = [];
    public narrativeGenes:Array<GenomeMap> = [];
    public contentGenes:Array<GenomeMap> = [];
    public executionGenes:Array<GenomeMap> = [];
    public styleGenes:Array<GenomeMap> = [];
    
    private rateListCache:Object = {};

    constructor() {
        let rec:GenomeMap = new GenomeMap();
        rec.getRecords('all').then((genes) => {
            // now sort them genes by their coordinate position...
            genes.models.sort((a,b) => {
                if (a.Cluster < b.Cluster) return -1; else if (a.Cluster > b.Cluster) return 1;
                return (a.Coordinate < b.Coordinate)?-1:1;
            });
            
            // parse all gene records a group them according to their vector
            genes.models.forEach((gene:GenomeMap) => {
                // if gene has an accepted values list, load it into our cache
                if (gene.AcceptedValuesList && gene.AcceptedValuesList !== '' && !this.rateListCache[gene.AcceptedValuesList]) {
                    this.rateListCache[gene.AcceptedValuesList] = [];
                    let list:ShellLists = new ShellLists();
                    list.getRecords(ShellLists.kListName+';=;'+gene.AcceptedValuesList)
                    .then (items => {this.rateListCache[gene.AcceptedValuesList] = items.models;});
                }
                
                switch (gene.Vector) {
                    case 'Theme':
                        this.themesGenes.push(gene);
                        break;
                
                    case 'Narrative':
                        this.narrativeGenes.push(gene);
                        break;
                
                    case 'Content':
                        this.contentGenes.push(gene);
                        break;
                
                    case 'Execution':
                        this.executionGenes.push(gene);
                        break;
                
                    case 'Style':
                        this.styleGenes.push(gene);
                        break;
                
                    default:
                        break;
                }
            });
            

        });
    }
    
    getRatingToolTip(listname:string, rate:string):string {
        let list:Array<ShellLists> = this.rateListCache[listname];
        if (list) {
            let listItem:ShellLists = list.find((item, index, obj) => {return item.ElementShortValue === rate;});
            if (listItem) {
                return listItem.ElementLongValue;
            } else {
                return '';
            }
        } else {
            return '';
        } 
    }
}
