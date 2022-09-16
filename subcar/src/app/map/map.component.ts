import { Component, OnInit  ,Input} from '@angular/core';
declare const L:any
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  key =  localStorage.getItem("user")
  data = JSON.parse(this.key)

  

@Input() hero
  constructor() { }
hello="hello";
  ngOnInit(): void {

    var greenIcon = L.icon({
      iconUrl: 'leaf-green.png',
      shadowUrl: 'leaf-shadow.png',
  
      iconSize:     [38, 95], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
    if(!navigator.geolocation){
      console.log("location is not supported");
    }

    var greenIcon = L.icon({
      iconUrl: '../../assets/images/icons8-location-48.png',
     
  
      iconSize:     [31, 38], // size of the icon

  });

navigator.geolocation.getCurrentPosition((position) => {
  const coords = position.coords;
  console.log(
    `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
  );
  let map = L.map('map').setView([coords.latitude, coords.longitude], 9);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

let userMarker = L.marker([coords.latitude, coords.longitude] ,{icon:greenIcon} ).addTo(map);
userMarker.bindPopup("<center><Strong>Me</Strong></center>").openPopup();
let hostMarker = L.marker([this.hero.lat, this.hero.lon]).addTo(map);
hostMarker.bindPopup(this.hero.businessName).openPopup();



});

  }

}
