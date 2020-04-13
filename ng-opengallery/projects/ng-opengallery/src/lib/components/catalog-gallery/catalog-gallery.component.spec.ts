import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogGalleryComponent } from './catalog-gallery.component';

describe('CatalogGalleryComponent', () => {
  let component: CatalogGalleryComponent;
  let fixture: ComponentFixture<CatalogGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
