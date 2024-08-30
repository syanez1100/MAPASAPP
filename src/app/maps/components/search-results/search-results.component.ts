import { Component } from '@angular/core';
import { Feature } from 'src/app/core/data/interfaces/places.interface';
import { MapService, PlacesService } from 'src/app/core/maps/services/index';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  public selectedId: string = '';

  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) { }

  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesService.places;
  }

  flyTo( place: Feature ) {
    this.selectedId = place.id;
    const [ lng, lat ] = place.geometry.coordinates;
    this.mapService.flyTo([ lng, lat ]);
  }

  getDirections( place: Feature ) {
    if (!this.placesService.userLocation) throw Error('User location not available');

    const start = this.placesService.userLocation;
    const end = place.geometry.coordinates as [number, number];

    this.mapService.getRouteBetweenPoints(start,end);

    this.placesService.deletePlaces();
  }
}
