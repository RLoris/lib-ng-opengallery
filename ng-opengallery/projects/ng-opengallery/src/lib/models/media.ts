import { SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

export class Media {
    type: string = 'img';
    description: string;
    previewUrl: string|SafeResourceUrl|SafeUrl;
    constructor(public url: string|SafeResourceUrl|SafeUrl, public title: string, type: string = 'img') {
        this.previewUrl = url;
        this.type = type;
    }
}