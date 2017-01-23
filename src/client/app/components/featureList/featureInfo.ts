import { Component, Input } from '@angular/core';

import { FeaturesEx } from '../../shared/moviegenome/index';

@Component({
    moduleId: module.id,
    selector: 'feature-info',
    templateUrl: 'featureInfo.html'
})

export class FeatureInfo {
    @Input() public record: FeaturesEx;

    public generateContentProfile() {
        if (this.record) {
            let saveCallback: string = this.record.fourdSaveCallbackMethod_;
            this.record.fourdSaveCallbackMethod_ = 'CPROGenerateFeatureProfile';
            this.record.updateRecord();
            this.record.fourdSaveCallbackMethod_ = saveCallback;
        }
    }

    public showPoster(e) {
        //console.log('enter',e);
        if (this.record.PosterURL && this.record.PosterURL !== '') {
            let xOffset = 30;
            let yOffset = 180;

            $('body').append('<img id="preview" src="http://54.191.46.243:8080/4DAction/REST_GetWebImage?image=' + this.record.PosterURL + '" alt="Image preview" />');
            $('#preview').css({
                'top': (e.pageY - yOffset) + 'px',
                'left': (e.pageX + xOffset) + 'px',
                'display': 'block',
                'position': 'relative',
                'z-index': 25000
            });
        }
    }

    public hidePoster(e) {
        //console.log('leave', e);
        $('#preview').remove();
    }
}
