import { Component, OnInit } from '@angular/core';
declare const L:any

@Component({
  selector: 'app-host-map',
  templateUrl: './host-map.component.html',
  styleUrls: ['./host-map.component.css']
})
export class HostMapComponent implements OnInit {
  key =  localStorage.getItem("host")
  data = JSON.parse(this.key)
  id= this.data[Object.keys(this.data)[0]]
  lat=this.data[Object.keys(this.data)[10]]
  lon=this.data[Object.keys(this.data)[11]]
  businussName=this.data[Object.keys(this.data)[2]]

  constructor() { }

  ngOnInit(): void {

  let map = L.map('map').setView([this.lat, this.lon], 9);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
   
}).addTo(map);
let marker = L.marker([this.lat, this.lon]).addTo(map);
marker.bindPopup(this.businussName).openPopup();


  }

}
