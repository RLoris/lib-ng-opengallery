import { Component, OnInit, Input } from '@angular/core';
import { MediaContainer } from '../../models/media-container';
import { NgOpengalleryService } from '../../ng-opengallery.service';

@Component({
  selector: 'masonry-gallery',
  templateUrl: './masonry-gallery.component.html',
  styleUrls: ['./masonry-gallery.component.css']
})
export class MasonryGalleryComponent implements OnInit {
  
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
  
  constructor(private service: NgOpengalleryService) {
    console.log('masonry');
  }

  ngOnInit(): void {
    this._datasource.forEach(d => {
      d.ready = false;
      d.loaded = false;
      d.elementRef = null;
      d.isInViewport = false;
      d.position = -1;
    });
  }

  select(idx: number) {
    this._datasource[idx].position = idx;
    this.service.selection.emit(this._datasource[idx].media);
  }

  onInViewportChange(event: boolean, media: MediaContainer) {
    media.isInViewport = event;
    if(!media.ready && event) {
      media.ready = event;
    }
    if(media.media.type === 'video' && media.loaded) {
      if(media.isInViewport) {
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
    media.loaded = true;
  }

  errorMedia(media: MediaContainer, element: any, idx: number) {
    media.error = true;
    this.service.error.emit(this._datasource[idx].media);
    this._datasource.splice(idx, 1);
  }

  getMediaHeight(mediaContainer) {
    if(mediaContainer.loaded) {
      return 'auto';
    } else {
      return this._prefHeight + 'px';
    }
  }

}
