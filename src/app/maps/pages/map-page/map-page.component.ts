import { Component } from '@angular/core';
import { PlacesService } from '../../../core/maps/services/index';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent {

  constructor(
    private placesService: PlacesService
  ) { }

  get isUserLocationReady(): boolean {
    return this.placesService.isUserLocationReady;
  }

}
