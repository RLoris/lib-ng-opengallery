import { Component, OnInit, Input } from '@angular/core';
import { MediaContainer } from '../../models/media-container';
import { NgOpengalleryService } from '../../ng-opengallery.service';

@Component({
  selector: 'catalog-gallery',
  templateUrl: './catalog-gallery.component.html',
  styleUrls: ['./catalog-gallery.component.css']
})
export class CatalogGalleryComponent implements OnInit {

  @Input()
  public set datasource(v: MediaContainer[]) {
    this._datasource = v;
  }

  public get datasource() {
    return this._datasource;
  }
  private _datasource: MediaContainer[];

  @Input()
  public set prefHeight(v: number) {
    if(v > 0) {
      this._prefHeight = v;
    }
  }

  public get prefHeight() {
    return this._prefHeight;
  }

  private _prefHeight = 200;

  @Input()
  public set spacing(v: number) {
    if(v >= 0) {
      this._spacing = v;
    }
  }

  public get spacing() {
    return this._spacing;
  }

  private _spacing: number = 3;

  @Input()
  public set autoplay(v: boolean) {
    this._autoplay = v;
  }

  public get autoplay() {
    return this._autoplay;
  }

  private _autoplay: boolean = true;

  constructor(private service: NgOpengalleryService) {}

  ngOnInit(): void {
    this._datasource.forEach(d => {
      d.ready = false;
      d.loaded = false;
      d.elementRef = null;
      d.isInViewport = false;
      d.position = -1;
    });
  }

  select(event, idx: number) {
    event.stopPropagation();
    this._datasource[idx].position = idx;
    if(this._datasource[idx].loaded && this._datasource[idx].media.type === 'video' && this._datasource[idx].elementRef && !this._datasource[idx].elementRef.paused) {
      this._datasource[idx].elementRef.pause();
    }
    this.service.selection.emit(this._datasource[idx].media);
  }

  onInViewportChange(event: boolean, media: MediaContainer) {
    media.isInViewport = event;
    if(!media.ready && event) {
      media.ready = event;
    }
    if(media.media.type === 'video' && media.loaded) {
      if(media.isInViewport && this.autoplay) {
        media.elementRef.play();
      } else {
        media.elementRef.pause();
      }
    }
  }

  loadMedia(media: MediaContainer, element: any) {
    media.height = element.videoHeight ? element.videoHeight : element.height;
    media.width = element.videoWidth ? element.videoWidth : element.width;
    media.elementRef = element;
    media.computedHeight = this._prefHeight;
    media.computedWidth = media.width / (media.height / media.computedHeight);
    media.loaded = true;
  }

  errorMedia(media: MediaContainer, element: any, idx: number) {
    media.error = true;
    this.service.error.emit(this._datasource[idx].media);
    this._datasource.splice(idx, 1);
  }

  getWidth(mediaContainer: MediaContainer) {
    if(mediaContainer.loaded) {
      return mediaContainer.computedWidth;
    } else {
      return this._prefHeight;
    }
  }

}
