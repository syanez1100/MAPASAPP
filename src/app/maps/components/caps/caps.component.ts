import { Component } from '@angular/core';
import { MapService } from 'src/app/core/maps/services';

@Component({
  selector: 'app-caps',
  templateUrl: './caps.component.html',
  styleUrls: ['./caps.component.css']
})
export class CapsComponent {


  public styleSelected = 'mapbox://styles/mapbox/streets-v12';
  public styles = [
    {
      name: 'Streets',
      value: 'mapbox://styles/mapbox/streets-v12',
      image: 'https://cdn.prod.website-files.com/5e832e12eb7ca02ee9064d42/64d4e4f4803795aef34e6434_streets.png'
    },
    {
      name: 'Light',
      value: 'mapbox://styles/mapbox/light-v11',
      image: 'https://cdn.prod.website-files.com/5e832e12eb7ca02ee9064d42/64d4e4f4803795aef34e6430_light.png'
    },
    {
      name: 'Dark',
      value: 'mapbox://styles/mapbox/dark-v11',
      image: 'https://cdn.prod.website-files.com/5e832e12eb7ca02ee9064d42/64d4e4f4803795aef34e6432_dark.png'
    },
    {
      name: 'Satellite',
      value: 'mapbox://styles/mapbox/satellite-v9',
      image: 'https://cdn.prod.website-files.com/5e832e12eb7ca02ee9064d42/64d4e4f4803795aef34e6438_Satellite%20Streets.png'
    }
  ]

  constructor(
    private mapService: MapService
  ){}

  changeStyle(style: string) {
    this.mapService.changeStyle(style);
    this.styleSelected = style;
  }

}
