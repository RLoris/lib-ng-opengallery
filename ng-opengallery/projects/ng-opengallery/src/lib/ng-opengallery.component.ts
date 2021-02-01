import { Component, OnInit, Input, Output, EventEmitter, IterableDiffers, IterableDiffer } from '@angular/core';
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
      this._dataref = v;
    }
  }

  _datasource: MediaContainer[] = [];
  _dataref: Media[];

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
    viewerEnabled: true,
    enableAutoPlay: true
  };

  mediaIdx: number = -1;
  showViewer: boolean = false;
  private iterableDiffer: IterableDiffer<[]>;

  constructor(private service: NgOpengalleryService, iterableDiffers: IterableDiffers) {
    this.selection = service.selection;
    this.error = service.error;
    this.change = service.change;
    this.open = service.open;
    this.selection.subscribe(
      (s: Media) => {
        if (this.config.viewerEnabled === true) {
          this.mediaIdx = this._datasource.findIndex(m => m.media === s);
          if (this.mediaIdx !== -1) {
            this.showViewer = true;
          }
        }
      }
    )
    this.open.subscribe(
      (b) => {
        this.showViewer = b;
      }
    )
    this.iterableDiffer = iterableDiffers.find([]).create();
  }

  ngOnInit(): void {}

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this._dataref as []);
    if(changes) {
      changes.forEachAddedItem((r) => {
          const media = r.item as any;
          this._datasource.push(new MediaContainer(media));
          this.service.differ.emit(media);
      });
      changes.forEachRemovedItem((r) => {
          const media = r.item as any;
          const idx = this._datasource.findIndex((m,idx) => m.media === media);
          this._datasource.splice(idx, 1);
          this.service.differ.emit(media);
      });
    }
  }

}
