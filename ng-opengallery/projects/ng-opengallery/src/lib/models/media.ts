export class Media {
    type: string = 'img';
    description: string;
    previewUrl: string;
    constructor(public url: string, public title: string, type: string = 'img') {
        this.previewUrl = url;
        this.type = type;
    }
}