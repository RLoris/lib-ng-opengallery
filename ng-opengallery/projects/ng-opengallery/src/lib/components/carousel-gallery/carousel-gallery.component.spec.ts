import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselGalleryComponent } from './carousel-gallery.component';

describe('CarouselGalleryComponent', () => {
  let component: CarouselGalleryComponent;
  let fixture: ComponentFixture<CarouselGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
