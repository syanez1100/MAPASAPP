export interface PlacesResponse {
  type: string;
  features: Feature[];
  attribution: string;
}

export interface Feature {
  type: string;
  id: string;
  geometry: Geometry;
  properties: Properties;
}

export interface Properties {
  mapbox_id: string;
  feature_type: string;
  full_address: string;
  name: string;
  name_preferred: string;
  coordinates: Coordinates;
  place_formatted?: string;
  context: Context;
  bbox?: number[];
}

export interface Context {
  address?: Address;
  street?: Street;
  postcode?: Street;
  place?: Place;
  region?: Region;
  country: Country;
}

export interface Country {
  mapbox_id: string;
  name: string;
  wikidata_id: string;
  country_code: string;
  country_code_alpha_3: string;
  translations: Translations;
}

export interface Region {
  mapbox_id: string;
  name: string;
  wikidata_id: string;
  region_code?: string;
  region_code_full?: string;
  translations: Translations;
}

export interface Place {
  mapbox_id: string;
  name: string;
  wikidata_id: string;
  translations: Translations;
}

export interface Translations {
  es: Es;
}

export interface Es {
  language: string;
  name: string;
}

export interface Street {
  mapbox_id: string;
  name: string;
}

export interface Address {
  mapbox_id: string;
  address_number: string;
  street_name: string;
  name: string;
}

export interface Coordinates {
  longitude: number;
  latitude: number;
  accuracy?: string;
  routable_points?: Routablepoint[];
}

export interface Routablepoint {
  name: string;
  latitude: number;
  longitude: number;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}
