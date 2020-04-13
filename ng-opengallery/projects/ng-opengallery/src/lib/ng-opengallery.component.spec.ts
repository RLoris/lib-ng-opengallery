import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgOpengalleryComponent } from './ng-opengallery.component';

describe('NgOpengalleryComponent', () => {
  let component: NgOpengalleryComponent;
  let fixture: ComponentFixture<NgOpengalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgOpengalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgOpengalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
