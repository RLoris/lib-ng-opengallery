import { NgModule } from '@angular/core';
import { NgOpengalleryComponent } from './ng-opengallery.component';
import { InViewportModule } from '@thisissoon/angular-inviewport';
import { MediaViewerComponent } from './components/media-viewer/media-viewer.component';
import { CatalogGalleryComponent } from './components/catalog-gallery/catalog-gallery.component';
import { MasonryGalleryComponent } from './components/masonry-gallery/masonry-gallery.component';
import { CarouselGalleryComponent } from './components/carousel-gallery/carousel-gallery.component';
import { SimpleGalleryComponent } from './components/simple-gallery/simple-gallery.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NgOpengalleryComponent,
    MediaViewerComponent,
    CatalogGalleryComponent,
    MasonryGalleryComponent,
    CarouselGalleryComponent,
    SimpleGalleryComponent
  ],
  imports: [
    CommonModule,
    InViewportModule
  ],
  exports: [
    NgOpengalleryComponent
  ]
})
export class NgOpengalleryModule { }
