import { Observable } from 'rxjs';
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
export class NgOpengalleryComponent implements OnInit {

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
    if (v) {
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
    viewerFullsize: false,
    enableAutoPlay: true,
    effectClass: null
  };

  private iterableDiffer: IterableDiffer<[]>;
  // private kvDiffer: KeyValueDiffer<any, any>;
  private showEmitter: EventEmitter<number> = new EventEmitter();
  showMedia$: Observable<number> = this.showEmitter.asObservable();

  constructor(private service: NgOpengalleryService, iterableDiffers: IterableDiffers, /*kvDiffers: KeyValueDiffers*/) {
    this.selection = service.selection;
    this.error = service.error;
    this.change = service.change;
    this.open = service.open;
    this.selection.subscribe(
      (s: Media) => {
        if (this.config.viewerEnabled === true) {
          const media = this._datasource.findIndex(m => m.media === s);
          if (media !== -1) {
            this.showEmitter.next(media);
          }
        }
      }
    );
    this.iterableDiffer = iterableDiffers.find([]).create();
    // this.kvDiffer = kvDiffers.find(this._config).create();
  }

  ngOnInit(): void {}

  ngDoCheck() {
    const changes = this.iterableDiffer.diff(this._dataref as []);
    if (changes) {
      changes.forEachAddedItem((r) => {
          const media = r.item as any;
          this._datasource.push(new MediaContainer(media));
          this.service.differ.emit(media);
      });
      changes.forEachRemovedItem((r) => {
          const media = r.item as any;
          const idx = this._datasource.findIndex((m) => m.media === media);
          this._datasource.splice(idx, 1);
          this.service.differ.emit(media);
      });
    }
    // TODO : avoid config update when not necessary
    /*const configChanges = this.kvDiffer.diff(this._config);
    if (configChanges) {
      configChanges.forEachChangedItem((r) => {
      });
    }*/
  }

}
