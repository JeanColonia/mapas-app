import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkerProps{
  color:string;
  marker?:mapboxgl.Marker;
  center?:[number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [

    `
  .mapaMarcadores{
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

  .list-group{
    position:fixed;
    right:20px;
    top:20px;
    cursor:pointer;
    z-index:100;
  }
  `
  ]
})
export class MarcadoresComponent implements AfterViewInit, OnDestroy{
  mapa!:mapboxgl.Map;

  @ViewChild('mapaMarcadores') mapaMarcadores!:ElementRef;

  zoomValue:number=15;
  center:[number, number]=[-77.03177952443416, -12.039929690592237];

marcadores:MarkerProps[]=[];
  constructor() { }
  ngOnDestroy(): void {
    this.mapa.off('move', ()=>{});
  }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.mapaMarcadores.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom:this.zoomValue
    });

    this.readLocalStorage();



    this.mapa.on('move', (event)=>{
      const target = event.target;
      const {lng, lat} = target.getCenter();

      this.center[0]=lng;
      this.center[1] = lat;
    })



    this.saveMarkersLocalStorage()
    // const div:HTMLElement = document.createElement('div');
    // div.innerHTML = 'Hola Mundo';

    // const marker = new mapboxgl.Marker({
    // })
    //                   .setLngLat(this.center)
    //                   .addTo(this.mapa)

  }


  marker(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const newMarker = new mapboxgl.Marker({
      draggable:true,
      color
    })
    .setLngLat(this.center)
    .addTo(this.mapa)

    this.marcadores.push({
      color,
      marker:newMarker
    })

    this.saveMarkersLocalStorage();
    newMarker.on('dragend',()=>{
      this.saveMarkersLocalStorage();
    });

  }



  goToMarker(marker:MarkerProps){
    const {lng, lat} = marker.marker!.getLngLat()
    this.mapa.flyTo({
      center:[lng, lat]
    }
    )
  }


  saveMarkersLocalStorage(){
    const markerArray:MarkerProps[]=[];

    this.marcadores.forEach(m =>{

      const color = m.color;
      const {lng, lat} = m.marker!.getLngLat();

      markerArray.push({
        color,
        center:[lng, lat]
      })

    })
    localStorage.setItem('marcadores', JSON.stringify(markerArray));


  }



  readLocalStorage(){

    if(!localStorage.getItem('marcadores')){
      return;
    }

   const lgLatArr:MarkerProps[]= JSON.parse(localStorage.getItem('marcadores')!);


lgLatArr.forEach(m => {

  const newMarker= new mapboxgl.Marker({
    color:m.color,
    draggable:true
  })
  .setLngLat(m.center!)
  .addTo(this.mapa)

  this.marcadores.push({
    marker: newMarker,
    color:m.color
  })

  newMarker.on('dragend', ()=>{
    this.saveMarkersLocalStorage()
  })

});


  }


  deleteMarker(i:number){

this.marcadores[i].marker?.remove();

this.marcadores.splice(i,1);
this.saveMarkersLocalStorage();

  }
}
