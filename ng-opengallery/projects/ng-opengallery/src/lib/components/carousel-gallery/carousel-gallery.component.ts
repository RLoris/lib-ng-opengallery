import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MediaContainer } from '../../models/media-container';
import { NgOpengalleryService } from '../../ng-opengallery.service';

@Component({
  selector: 'carousel-gallery',
  templateUrl: './carousel-gallery.component.html',
  styleUrls: ['./carousel-gallery.component.css']
})
export class CarouselGalleryComponent implements OnInit, OnDestroy {

  @Input()
  public set datasource(v: MediaContainer[]) {
    this._datasource = v;
  }

  public get datasource() {
    return this._datasource;
  }
  private _datasource: MediaContainer[];

  @Input()
  public set diaporama(v: number) {
    if(v >= 0) {
      this._diaporama = v;
    }
    this.stopCarousel();
    this.startCarousel();
  }

  private _diaporama = 0;
  
  private diaporamaId = null;

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

  currentIdx: number = 0;
  showDescription:boolean = false;
  animationClass = 'animate';

  constructor(private service: NgOpengalleryService) {
    console.log('carousel');
  }

  ngOnDestroy(): void {
    this.stopCarousel();
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

  prev() {
      if(this.currentIdx === 0) {
        this.currentIdx = this.datasource.length - 1;
      } else {
        this.currentIdx--;
      }
      this.service.change.emit(this._datasource[this.currentIdx].media);
  }

  next() {
      if(this.currentIdx === this.datasource.length-1) {
        this.currentIdx = 0;
      } else {
        this.currentIdx++;
      }
      this.service.change.emit(this._datasource[this.currentIdx].media);
  }

  displayDescription() {
    this.showDescription = true;
  }

  hideDescription() {
    this.showDescription = false;
  }

  private startCarousel() {
    if(this._diaporama > 0 && !this.diaporamaId) {
      this.diaporamaId = setInterval(() => this.next(), this._diaporama * 1000);
    }
  }

  private stopCarousel() {
    if(this.diaporamaId) {
      clearInterval(this.diaporamaId);
      this.diaporamaId = null;
    }
  }

  display(event, idx: number) {
    event.stopPropagation();
    this.currentIdx = idx;
    this.stopCarousel();
    this.startCarousel();
  }

  loadMedia(mediaContainer: MediaContainer,element: any) {
    mediaContainer.elementRef = element;
    mediaContainer.loaded = true;
  }

  errorMedia(mediaContainer: MediaContainer,idx: number) {
    mediaContainer.error = true;
    this.service.error.emit(this._datasource[idx].media);
    this._datasource.splice(idx, 1);
  }

}
