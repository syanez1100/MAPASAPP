import { HttpClient, HttpHandler, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class PlacesApiClient extends HttpClient {
  public baseUrl = 'https://api.mapbox.com/search/geocode/v6';

  constructor(handle: HttpHandler) {
    super(handle);
  }

  public override get<T>(url: string, options: {
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
  }) {
    url = this.baseUrl + url;
    return super.get<T>(url,{
      params: {
        limit: 5,
        language: 'es',
        access_token: environment.apiKey,
        ...options.params
      }
    });
  }

}
