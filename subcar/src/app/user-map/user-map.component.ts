import { Component, OnInit } from '@angular/core';
import { UserMapService } from '../services/user-map.service';
declare const L:any

@Component({
  selector: 'app-user-map',
  templateUrl: './user-map.component.html',
  styleUrls: ['./user-map.component.css']
})
export class UserMapComponent implements OnInit {
  arrayofhoststoshow:any=[];
arr:any=[]
sortedarray:any=[]
  hostsArray:any=[];
  Markersrray:any=[];
  constructor(
    private userMapService:UserMapService
  ) { }

  ngOnInit(): void {

    
console.log(this.Markersrray)
    this.getallhosts();
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
  // console.log(
  //   `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
  // );
  let map = L.map('map').setView([coords.latitude, coords.longitude], 8);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
}).addTo(map);
for(let i of  this.Markersrray){
  let marker = L.marker([i.lat, i.lon] ).addTo(map);
marker.bindPopup(i.name).openPopup();
// console.log(i.name)
// console.log(this.getDistanceFromLatLonInKm(coords.latitude,coords.longitude,i.lat,i.lon).toFixed(1))
this.sortedarray.push(this.getDistanceFromLatLonInKm(coords.latitude,coords.longitude,i.lat,i.lon).toFixed(1))

const hosts={
_id:i._id,
distance:this.getDistanceFromLatLonInKm(coords.latitude,coords.longitude,i.lat,i.lon).toFixed(1)
}
this.arr.push(hosts)
}
// console.log(this.sortedarray)
let userMarker = L.marker([coords.latitude, coords.longitude] ,{icon:greenIcon} ).addTo(map);
userMarker.bindPopup("<center><Strong>Me</Strong></center>").openPopup();

this.sortedarray = this.arr.sort((a, b) => a.distance - b.distance);
console.log(this.sortedarray,"h")
for(let j of this.sortedarray){
  for(let i of this.Markersrray){
      if(j._id == i._id){
       this.arrayofhoststoshow.push(i)
      }
  }
}
 console.log(this.arrayofhoststoshow)

});


this.userMapService.sendId(this.arrayofhoststoshow);


  }
  


getallhosts(){
  this.userMapService.getallhosts().subscribe((data) => {
    this.hostsArray=data;
    // console.log(this.hostsArray)
    for(let i of this.hostsArray){
      if(i.lat && i.lon){
       this.Markersrray.push(i)
      }
    }
  })
}

getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
  var dLon = this.deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

deg2rad(deg) {
  return deg * (Math.PI/180)
}


}
