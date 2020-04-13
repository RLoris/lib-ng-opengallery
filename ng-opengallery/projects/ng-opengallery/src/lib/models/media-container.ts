import { Media } from './media';

export class MediaContainer {
    position: number = -1;
    widthMargin: number = 0;
    heightMargin: number = 0;
    computedHeight: number;
    computedWidth: number;
    height: number;
    width: number;
    elementRef: HTMLVideoElement;
    isInViewport: boolean = false;
    ready: boolean = false;
    loaded: boolean = false;
    error: boolean = false;

    constructor(public media: Media) {}
}