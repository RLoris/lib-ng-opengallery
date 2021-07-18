import { Observable, Subscription } from 'rxjs';
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
    if (v >= 0) {
      this._diaporama = v;
    }
  }

  public get diaporama(): number {
    return this._diaporama;
  }

  private _diaporama = 2;
  private activeSub: Subscription;
  mediaIdx = -1;

  @Input()
  public set active(o: Observable<number>) {
    if (this.activeSub) {
      this.activeSub.unsubscribe();
    }
    this.activeSub = o.subscribe(
      (v: number) => {
        if (v >= 0 && v < this._datasource.length) {
          this.mediaIdx = v;
          this.show = true;
        } else {
          this.show = false;
        }
        if (this.show === false) {
          this.closeModal();
        } else {
          this.service.open.emit(this.show);
          this.service.change.emit(this._datasource[this.mediaIdx].media);
        }
      }
    );
  }

  public get active() {
    return this._active;
  }

  private _active: Observable<number>;

  show = false;

  @Input()
  public set autoplay(v: boolean) {
    this._autoplay = v;
  }

  public get autoplay() {
    return this._autoplay;
  }

  private _autoplay = true;

  diaporamaId = null;

  @Input()
  public set fullsize(v: boolean) {
    this._fullsize = v;
  }

  public get fullsize(): boolean {
    return this._fullsize;
  }

  private _fullsize = false;

  @Input()
  public set effectClass(v: string) {
    this._effectClass = v;
  }

  public get effectClass(): string {
    return this._effectClass;
  }

  private _effectClass: string;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if (event.code === 'ArrowRight') {
      this.next();
    }

    if (event.code === 'ArrowLeft') {
      this.prev();
    }

    if (event.code === 'Escape') {
      this.closeModal();
    }

    if (event.code === 'Space') {
      if (this.diaporamaId !== null) {
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
    if (this.show) {
      this.service.open.emit(false);
      this.mediaIdx = -1;
      this.show = false;
      this.stopDiaporama();
    }
  }

  startDiaporama() {
    if (this._diaporama > 0 && !this.diaporamaId) {
      this.diaporamaId = setInterval(() => this.next(), this._diaporama * 1000);
    }
  }

  stopDiaporama() {
    if (this.diaporamaId) {
      clearInterval(this.diaporamaId);
      this.diaporamaId = null;
    }
  }

  prev() {
    if (this.show) {
      const temp = this.effectClass;
      this.effectClass = null;
      setTimeout(() => this.effectClass = temp, 0);
      if (this.mediaIdx === 0) {
        this.mediaIdx = this.datasource.length - 1;
      } else {
        this.mediaIdx--;
      }
      this.service.change.emit(this._datasource[this.mediaIdx].media);
    }
  }

  next() {
    if (this.show) {
      const temp = this.effectClass;
      this.effectClass = null;
      setTimeout(() => this.effectClass = temp, 0);
      if (this.mediaIdx === (this.datasource.length - 1)) {
        this.mediaIdx = 0;
      } else {
        this.mediaIdx++;
      }
      this.service.change.emit(this._datasource[this.mediaIdx].media);
    }
  }

  exitModal(event) {
    if (event.srcElement.classList.contains('modal-content')) {
      this.closeModal();
    }
  }

  changeSize() {
    this._fullsize = !this._fullsize;
  }

  onError(idx: number) {
    this._datasource[idx].error = true;
    this.service.error.emit(this._datasource[idx].media);
    this._datasource.splice(idx, 1);
  }

  onLoad(mediaContainer: MediaContainer) {
    mediaContainer.loaded = true;
  }

}
