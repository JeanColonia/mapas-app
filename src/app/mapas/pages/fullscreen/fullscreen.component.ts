import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styles: [`

  #mapa{
    width:100%;
    height:100%
  }
  `

  ]
})
export class FullscreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

var map = new mapboxgl.Map({
  container: 'mapa',
  style: 'mapbox://styles/mapbox/streets-v11',
  center:[-77.530754388782, -9.512679100963949],
  zoom:13
});

  }

}
