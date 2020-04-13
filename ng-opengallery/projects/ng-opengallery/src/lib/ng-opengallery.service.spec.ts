import { TestBed } from '@angular/core/testing';

import { NgOpengalleryService } from './ng-opengallery.service';

describe('NgOpengalleryService', () => {
  let service: NgOpengalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgOpengalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
