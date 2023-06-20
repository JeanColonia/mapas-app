import { Component, OnInit, AfterViewInit, Input, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styles: [`

  div{
      width:100%;
      height:200px;
      margin:0px;

    }
  `


  ]
})
export class MiniMapaComponent implements AfterViewInit {
  @Input() lngLat:[number, number] =[0,0];
  @ViewChild('mapa') divMapa!:ElementRef;

  mapa!:mapboxgl.Map;
  constructor() { }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom:15,
      interactive:false
    });


    const marker = new mapboxgl.Marker()
    .setLngLat(this.lngLat)
    .addTo(this.mapa)

  }


}
