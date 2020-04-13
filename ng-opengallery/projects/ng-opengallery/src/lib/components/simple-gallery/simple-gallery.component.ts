import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MediaContainer } from '../../models/media-container';
import { NgOpengalleryService } from '../../ng-opengallery.service'

@Component({
  selector: 'simple-gallery',
  templateUrl: './simple-gallery.component.html',
  styleUrls: ['./simple-gallery.component.css']
})
export class SimpleGalleryComponent implements OnInit {

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
      this.computeMediasDimension(this.galleryElement.nativeElement.offsetWidth - 17);
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
      this.computeMediasDimension(this.galleryElement.nativeElement.offsetWidth - 17);
    }  
  }

  public get spacing() {
    return this._spacing;
  }

  private _spacing: number = 3;

  @ViewChild('gallery', {static:true})
  private galleryElement: ElementRef<HTMLDivElement>;
  
  constructor(private service: NgOpengalleryService) {
    console.log('simple');
  }

  ngOnInit(): void {
    this._datasource.forEach(d => {
      d.ready = false;
      d.loaded = false;
      d.elementRef = null;
      d.isInViewport = false;
      d.position = -1;
    });
    this.computeMediasDimension(this.galleryElement.nativeElement.offsetWidth - 20);
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
      if(event) {
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
    this.computeMediasDimension(this.galleryElement.nativeElement.offsetWidth - 20);
    console.log('loaded ' + media.media.title);
    media.loaded = true;
  }

  onResize() {
    this.computeMediasDimension(this.galleryElement.nativeElement.offsetWidth - 20);
  }

  onError(mediaContainer: MediaContainer, idx: number) {
    mediaContainer.error = true;
    this.service.error.emit(this._datasource[idx].media);
    this._datasource.splice(idx,1);
  }

  private computeMediasDimension(clientWidth: number) {
    let availableWidth = clientWidth;
    let rowMedia: MediaContainer[] = [];
    let rowcount = 0;
    let totalSpacing = 0;
    for (let idx = 0; idx < this._datasource.length; idx++) {
      const element = this._datasource[idx];
      this.computeMediaRatio(element);
      availableWidth -= element.computedWidth;
      element.position = rowcount;
      element.widthMargin = this._spacing;
      element.heightMargin = this._spacing;
      totalSpacing += this._spacing * 2;
      rowMedia.push(element);
      if(availableWidth <= 0) {
        const widthRatio = (clientWidth + Math.abs(availableWidth) + totalSpacing) / clientWidth;
        for (let i = 0; i < rowMedia.length; i++) {
          const el = rowMedia[i];
          el.computedWidth = el.computedWidth / widthRatio;
          el.computedHeight = el.height / (el.width / el.computedWidth);
          el.widthMargin = el.widthMargin / widthRatio;
          el.heightMargin = el.heightMargin / (el.width / el.computedWidth);
        }
        rowMedia = [];
        totalSpacing = 0;
        availableWidth = clientWidth;
        rowcount++;
      }
    }
  }

  private computeMediaRatio(element: MediaContainer) {
    element.computedHeight = this._prefHeight;
    element.computedWidth = element.width / (element.height / element.computedHeight);
  }

  getMediaHeight(media: MediaContainer) {
    if(media.loaded) {
      return media.computedHeight;
    } else {
      return this._prefHeight;
    }
  }

  getMediaWidth(media: MediaContainer) {
    if(media.loaded) {
      return media.computedWidth;
    } else {
      return this._prefHeight;
    }
  }


}
