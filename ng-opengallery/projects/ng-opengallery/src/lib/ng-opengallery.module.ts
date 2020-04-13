import { NgModule } from '@angular/core';
import { NgOpengalleryComponent } from './ng-opengallery.component';
import { BrowserModule } from '@angular/platform-browser';
import { InViewportModule } from '@thisissoon/angular-inviewport';
import { MediaViewerComponent } from './components/media-viewer/media-viewer.component';
import { CatalogGalleryComponent } from './components/catalog-gallery/catalog-gallery.component';
import { MasonryGalleryComponent } from './components/masonry-gallery/masonry-gallery.component';
import { CarouselGalleryComponent } from './components/carousel-gallery/carousel-gallery.component';
import { SimpleGalleryComponent } from './components/simple-gallery/simple-gallery.component';

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
    BrowserModule,
    InViewportModule
  ],
  exports: [
    NgOpengalleryComponent
  ]
})
export class NgOpengalleryModule { }
