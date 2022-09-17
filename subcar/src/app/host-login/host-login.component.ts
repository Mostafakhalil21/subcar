import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { HostAuthService } from '../services/host-auth.service';
import { ValidateService } from '../services/validate.service';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-host-login',
  templateUrl: './host-login.component.html',
  styleUrls: ['./host-login.component.css']
})
export class HostLoginComponent implements OnInit {
  businessName;
  password;
  name;
  email;
  businessImg;

  lat;
  lon;

  city:String;
  constructor(
    private validateservice:ValidateService ,
    private hostAuth:HostAuthService, 
    private router:Router,
    private flashMessage:FlashMessagesService,
    private http:HttpClient

  ) { }

  ngOnInit(): void {
    $(document).ready(function(){
      $('#goRight').on('click', function(){
        $('#slideBox').animate({
          'marginLeft' : '0'
        });
        $('.topLayer').animate({
          'marginLeft' : '100%'
        });
      });
      $('#goLeft').on('click', function(){
        $('#slideBox').animate({
          'marginLeft' : '50%'
        });
        $('.topLayer').animate({
          'marginLeft': '0'
        });
      });
    });
  }

  // selectImage(event){
  // if(event.target.files){
  //   var reader = new FileReader();
  //   reader.readAsDataURL(event.target.files[0]);
  //   reader.onload=(event:any)=>{
  //     this.businessImg=event.target.result;
  //   }
  // }
  // }

  addLocation(){
    if(!navigator.geolocation){
      console.log("location is not supported");
    }


navigator.geolocation.getCurrentPosition((position) => {
  const coords = position.coords;
  this.lat=coords.latitude;
  this.lon=coords.longitude;
  console.log(coords)
})
  }


  onLoginSubmit(){
  
    const host = {
      businessName :this.businessName,
      password:this.password
    }

    this.hostAuth.authenticateHost(host).subscribe(data =>{
      if(data.success)
      {
        this.hostAuth.storeHostData(data.token , data.host);
        this.flashMessage.show('You are now logged in' , {
          cssClass: 'alert-success',
          timeout:5000
        });
        this.router.navigate(['hostprofile']).then(()=>{
          window.location.reload();
        })
      }
      else
      {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger' , timeout:5000});  
        this.router.navigate[('hostlogin')]
      }
    })

  }


}
