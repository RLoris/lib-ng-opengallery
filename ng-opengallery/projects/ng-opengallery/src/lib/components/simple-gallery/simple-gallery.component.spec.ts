import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleGalleryComponent } from './simple-gallery.component';

describe('SimpleGalleryComponent', () => {
  let component: SimpleGalleryComponent;
  let fixture: ComponentFixture<SimpleGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
