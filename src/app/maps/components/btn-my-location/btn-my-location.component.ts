import { Component } from '@angular/core';
import { MapService, PlacesService } from 'src/app/core/maps/services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {

  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) { }

  goToMyLocation(){
    if ( !this.placesService.userLocation ) throw Error('User location is not set');
    if ( !this.mapService.isMapReady ) throw Error('Map not ready');
    this.mapService.flyTo(this.placesService.userLocation)
  }

}
