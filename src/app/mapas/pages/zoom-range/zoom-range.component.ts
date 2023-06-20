import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
  .mapaZoomRange{
    width:100%;
    height:100%
  }

  .row{
    position:fixed;
    background-color:#fff;
    border-radius:5px;
    z-index:100;
    padding:10px;
    bottom:50px;
    left:50px;
    width:400px;
  }
  `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

mapa!:mapboxgl.Map;

@ViewChild('mapaZoomRange') mapaZoomRangeDiv!:ElementRef;

zoomValue:number=10;
center:[number, number]=[-77.03177952443416, -12.039929690592237];

  constructor() { }
  ngOnDestroy(): void {
   this.mapa.off('zoom', ()=>{});
   this.mapa.off('zoomend', ()=>{});
   this.mapa.off('move', ()=>{});
  }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.mapaZoomRangeDiv.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom:this.zoomValue
    });


    this.mapa.on('zoom', (ev)=>{
     this.zoomValue =  this.mapa.getZoom();
    })


    this.mapa.on('zoomend', (ev)=>{
      if(this.mapa.getZoom()>18){
        this.mapa.zoomTo(18);
      }
    })


    this.mapa.on('move',(event)=>{
      const target = event.target;

      const {lng, lat} = target.getCenter();
      this.center[0]=lng;
      this.center[1]=lat;
    })

  }



  zoomIn(){

    this.mapa.zoomIn();
  }

  zoomOut(){

    this.mapa.zoomOut();
  }


  zoomChanged(valor:string){

    this.mapa.zoomTo(Number(valor));
  }

}
