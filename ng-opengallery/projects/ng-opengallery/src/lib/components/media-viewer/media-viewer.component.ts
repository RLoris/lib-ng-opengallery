import { Component, OnInit, HostListener, Input, OnDestroy } from '@angular/core';
import { MediaContainer } from '../../models/media-container';
import { NgOpengalleryService } from '../../ng-opengallery.service';

@Component({
  selector: 'media-viewer',
  templateUrl: './media-viewer.component.html',
  styleUrls: ['./media-viewer.component.css']
})
export class MediaViewerComponent implements OnInit, OnDestroy {

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
    if(v > 0) {
      this._diaporama = v;
    }
  }

  private _diaporama = 2;

  @Input()
  public set mediaIdx(v: number) {
    if(v >= 0 && v < this._datasource.length) {
      this._mediaIdx = v;
    }
  }

  public get mediaIdx() {
    return this._mediaIdx;
  }

  private _mediaIdx: number = -1;

  @Input()
  public set active(v: boolean) {
    if(this._mediaIdx >= 0 && this._mediaIdx < this._datasource.length) {
      setTimeout(() => this._active = v, 0);
    }
    if(this._active === false) {
      this.closeModal();
    } else {
      this.service.open.emit(this._active);
      this.service.change.emit(this._datasource[this._mediaIdx].media);
    }
  }

  public get active() {
    return this._active;
  }

  private _active: boolean = false;

  @Input()
  public set autoplay(v: boolean) {
    this._autoplay = v;
  }

  public get autoplay() {
    return this._autoplay;
  }

  private _autoplay: boolean = true;

  diaporamaId = null;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if(event.code === 'ArrowRight') {
      this.next();
    }

    if(event.code === 'ArrowLeft') {
      this.prev();
    }

    if(event.code === 'Escape') {
      this.closeModal();
    }

    if(event.code === 'Space') {
      if(this.diaporamaId !== null) {
        this.stopDiaporama();
      } else {
        this.startDiaporama();
      }

    }
  }

  constructor(private service: NgOpengalleryService) {}

  ngOnDestroy(): void {
    this.stopDiaporama();
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

  closeModal() {
    if(this._active) {
      this._mediaIdx = -1;
      this._active = false;
      this.stopDiaporama();
      this.service.open.emit(this._active);
    }
  }

  startDiaporama() {
    if(this._diaporama > 0 && !this.diaporamaId) {
      this.diaporamaId = setInterval(() => this.next(), this._diaporama * 1000);
    }
  }

  stopDiaporama() {
    if(this.diaporamaId) {
      clearInterval(this.diaporamaId);
      this.diaporamaId = null;
    }
  }

  prev() {
    if(this._active) {
      if(this._mediaIdx === 0) {
        this._mediaIdx = this.datasource.length - 1;
      } else {
        this._mediaIdx--;
      }
      this.service.change.emit(this._datasource[this._mediaIdx].media);
    }
  }

  next() {
    if(this._active) {
      if(this._mediaIdx === this.datasource.length-1) {
        this._mediaIdx = 0;
      } else {
        this._mediaIdx++;
      }
      this.service.change.emit(this._datasource[this._mediaIdx].media);
    }
  }

  onError(idx: number) {
    this._datasource[idx].error = true;
    this.service.error.emit(this._datasource[idx].media);
    this._datasource.splice(idx,1);
  }

  onLoad(mediaContainer: MediaContainer) {
    mediaContainer.loaded = true;
  }

}
