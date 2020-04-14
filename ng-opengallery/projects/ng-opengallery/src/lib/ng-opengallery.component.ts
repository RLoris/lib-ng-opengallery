import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MediaContainer } from './models/media-container';
import { Config } from './models/config';
import { Media } from './models/media';
import { LayoutStyle } from './models/layout-style';
import { NgOpengalleryService } from './ng-opengallery.service';

@Component({
  selector: 'ng-opengallery',
  templateUrl: './ng-opengallery.component.html',
  styleUrls: ['./ng-opengallery.component.css']
})
export class NgOpengalleryComponent implements OnInit{

  @Output()
  change: EventEmitter<Media>;
  @Output()
  error: EventEmitter<Media>;
  @Output()
  selection: EventEmitter<Media>;
  @Output()
  open: EventEmitter<boolean>;

  @Input()
  public set datasource(v: Media[]) {
    if(v) {
      const arr = [];
      for (let idx = 0; idx < v.length; idx++) {
        const media = v[idx];
        arr.push(new MediaContainer(media));
      }
      this._datasource = arr;
    }
  }

  _datasource: MediaContainer[];

  @Input()
  public set config(v: Config) {
    this._config = v;
  }

  public get config() {
    return this._config;
  }
  private _config: Config = {
    diaporamaDuration: 3,
    layout: LayoutStyle.SIMPLE,
    prefMediaHeight: 250,
    spacing: 2,
    viewerEnabled: true
  };

  mediaIdx: number = -1;
  showViewer: boolean = false;

  constructor(service: NgOpengalleryService) {
    this.selection = service.selection;
    this.error = service.error;
    this.change = service.change;
    this.open = service.open;
    this.selection.subscribe(
      (s: Media) => {
        if(this.config.viewerEnabled === true) {
          this.mediaIdx = this._datasource.find(m => m.media === s).position;
          this.showViewer = true;
        }
      }
    )
    this.open.subscribe(
      (b) => {
        this.showViewer = b;
      }
    )
  }

  ngOnInit(): void {}

}
