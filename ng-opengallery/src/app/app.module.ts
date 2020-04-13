import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgOpengalleryModule } from 'projects/ng-opengallery/src/public-api';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgOpengalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
