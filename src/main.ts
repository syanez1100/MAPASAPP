import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import Mapboxgl from 'mapbox-gl';
Mapboxgl.accessToken = 'pk.eyJ1Ijoic3lhbmV6IiwiYSI6ImNtMGNqZWQyODAzMG0ya3B1dDdoM2dtdjUifQ.GolXwtptY8JeJjw4CbVkFQ';

if (!navigator.geolocation) {
  alert('Geolocation is not available');
  throw new Error('Geolocation is not available');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
