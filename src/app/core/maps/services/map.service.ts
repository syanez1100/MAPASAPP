import { Injectable } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../../data/interfaces/places.interface';
import { DirectionsApiClient } from '../../http';
import { DirectionsResponse, Route } from '../../data/interfaces/directions.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map;
  private markes: Marker[] = [];

  constructor(
    private directionsApi: DirectionsApiClient
  ) { }

  get isMapReady(): boolean {
    return !!this.map;
  }

  setMap(map: Map) {
    this.map = map;
  }

  changeStyle(style: string) {
    if (!this.isMapReady) throw Error('Map not ready');

    this.map?.setStyle(style);
  }

  flyTo(coords: LngLatLike) {
    if (!this.isMapReady) throw Error('Map not ready');

    this.map?.flyTo({
      zoom: 14,
      center: coords
    });
  }

  createMarkersFromPlacers(places: Feature[], userLocation: [number, number]) {
    if (!this.map) throw Error('Map not ready');

    this.markes.forEach(marker => marker.remove());

    const newMarkers = [];

    for (const place of places) {
      const [lng, lat] = place.geometry.coordinates;
      const popup = new Popup().
        setHTML(`
        <h6>${place.properties.name}</h6>
        <p>${place.properties.full_address}</p>`
        );
      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map);
      newMarkers.push(newMarker);
    }

    this.markes = newMarkers;

    if (places.length === 0) return;

    const boundes = new LngLatBounds();

    newMarkers.forEach(marker => {
      boundes.extend(marker.getLngLat());
    });
    boundes.extend(userLocation);

    this.map.fitBounds(boundes, { padding: 200 });
  }

  getRouteBetweenPoints(start: [number, number], end: [number, number]) {
    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe((response) => {
        this.drawPolyLine(response.routes[0]);
      }
      );
  }

  private drawPolyLine(route: Route) {
    if (!this.map) throw Error('Map not ready');

    const coords = route.geometry.coordinates;

    const bounds = new LngLatBounds();

    coords.forEach( ([lng,lat]) => {
      bounds.extend([lng,lat]);
    });

    this.map?.fitBounds(bounds ,{
      padding: 200
    });

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    };

    if (this.map.getLayer('routeString')) {
      this.map.removeLayer('routeString');
      this.map.removeSource('routeString');
    }

    this.markes.slice(1).forEach(marker => marker.remove());

    this.map.addSource('routeString', sourceData);
    this.map.addLayer({
      id: 'routeString',
      type: 'line',
      source: 'routeString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#3887be',
        'line-width': 3
      }
    });
  }

}
