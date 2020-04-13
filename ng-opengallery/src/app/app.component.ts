import { Component } from '@angular/core';
import { Media, Config, LayoutStyle } from 'projects/ng-opengallery/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-opengallery';

  data: Media[];

  config: Config = {
    diaporamaDuration: 3,
    layout: LayoutStyle.CAROUSEL,
    prefMediaHeight: 250,
    spacing: 3,
    viewerEnabled: true
  } 

  styles: string[];

  constructor() {
    this.styles = Object.keys(LayoutStyle).filter( (s:any) => isNaN(s));
  }

  changeLayout(v) {
    this.config.layout = v;
  }

  changeViewer(v) {
    this.config.viewerEnabled = !this.config.viewerEnabled;
  }

  changeHeight(v) {
    this.config.prefMediaHeight = v;
  }

  changeSpacing(v) {
    this.config.spacing = v;
  }

  changeDuration(v) {
    this.config.diaporamaDuration = v;
  }

  loadSampleData() {
    this.data = [
      new Media('assets/error.jpg', 'not showing'),
      new Media('assets/wedding.jpg', 'Wedding'),
      new Media('assets/stones.jpg', 'Stones'),
      new Media('assets/autumn.jpg', 'Autumn'),
      new Media('assets/eiffel.jpg', 'Eiffel tower'),
      new Media('assets/trees.jpg', 'Trees'),
      new Media('assets/forest.jpg', 'Forest'),
      new Media('assets/rock.jpg', 'Rocks'),
      
      new Media('assets/underwater.jpg', 'Underwater'),
      new Media('assets/beach.jpg', 'Beach'),
      new Media('assets/seashore.jpg', 'Seashore'),
      new Media('assets/medical.jpg', 'Medical'),
      new Media('assets/mountain.jpg', 'Mountain'),
      new Media('assets/lavande.jpg', 'Lavande'),
      new Media('https://images.pexels.com/photos/3968083/pexels-photo-3968083.jpeg?cs=srgb&dl=personne-mains-femme-savon-3968083.jpg&fm=jpg', 'Hands'),
      
      new Media('assets/SampleVideo.mp4', 'Sample', 'video'),
      new Media('assets/wallpaper.jpg', 'Wallpaper'),
      new Media('assets/circle.jpg', 'Circle'),
      new Media('assets/stars.jpg', 'Stars'),
      new Media('assets/plant.jpg', 'Plant'),
      new Media('assets/clouds.jpg', 'Clouds'),
      new Media('assets/painting.jpg', 'Painting'),
      new Media('assets/lamps.jpg', 'Lamps'),
    
      new Media('assets/design.jpg', 'Design'),
      new Media('assets/leaves.jpg', 'Leaves'),
      new Media('assets/abstract.jpg', 'Abstract'),
      new Media('assets/spiral.jpg', 'Spiral'),
      new Media('assets/coronavirus.jpg', 'Coronavirus'),
      new Media('assets/architecture.jpg', 'Architecture'),
      new Media('https://images.pexels.com/photos/3179911/pexels-photo-3179911.jpeg?cs=srgb&dl=homme-halloween-horreur-masque-3179911.jpg&fm=jpg', 'Anonymous')
    ];
  }

  onChange(event) {
    console.log('CHANGE event: ' + event);
  }

  onError(event) {
    console.log('ERROR event: ' + event);
  }

  onSelection(event) {
    console.log('SELECTION event: ' + event);
  }

  onOpen(event) {
    console.log('OPEN event: ' + event);
  }
}
