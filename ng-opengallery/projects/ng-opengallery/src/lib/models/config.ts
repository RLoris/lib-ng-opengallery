import { LayoutStyle } from './layout-style';

export class Config {
    prefMediaHeight: number = 200;
    spacing: number = 5;
    layout: LayoutStyle = LayoutStyle.SIMPLE;
    viewerEnabled: boolean = true;
    viewerFullsize: boolean = false;
    diaporamaDuration: number = 3;
    enableAutoPlay: boolean = true;
    effectClass: string = null;
}
