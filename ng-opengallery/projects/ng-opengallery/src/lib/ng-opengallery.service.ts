import { Injectable, EventEmitter } from '@angular/core';
import { Media } from './models/media';

@Injectable({
  providedIn: 'root'
})
export class NgOpengalleryService {

  change: EventEmitter<Media> = new EventEmitter<Media>();

  error: EventEmitter<Media> = new EventEmitter<Media>();

  selection: EventEmitter<Media> = new EventEmitter<Media>();

  open: EventEmitter<boolean> = new EventEmitter<boolean>();

  differ: EventEmitter<Media> = new EventEmitter<Media>();

  constructor() { }
}
