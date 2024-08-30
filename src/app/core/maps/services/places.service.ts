import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../../data/interfaces/places.interface';
import { PlacesApiClient } from '../../http/placesApiClient';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];
  public isLoadingPlaces = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor(
    private placesApi: PlacesApiClient,
    private mapService: MapService
  ) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (error) => {
          alert('Error getting user location');
          console.error('Error getting user location', error);
          reject(new Error('Error getting user location'));
        }
      );
    });
  }

  getPlacesByQuery(query: string) {
    if (query.length === 0) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }
    if (!this.userLocation) throw new Error('User location not ready');
    this.isLoadingPlaces = true;
    this.placesApi.get<PlacesResponse>(`/forward?q=${query}`, {
      params: {
        proximity: this.userLocation.join(','),
      }
    })
      .subscribe((response) => {
        this.isLoadingPlaces = false;
        this.places = response.features;
        this.mapService.createMarkersFromPlacers(this.places, this.userLocation!);
      });
  }

  deletePlaces() {
    this.places = [];
  }

}
