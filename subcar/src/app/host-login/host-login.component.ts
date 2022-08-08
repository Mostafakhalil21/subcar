import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { HostAuthService } from '../services/host-auth.service';
import { ValidateService } from '../services/validate.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-host-login',
  templateUrl: './host-login.component.html',
  styleUrls: ['./host-login.component.css']
})
export class HostLoginComponent implements OnInit {
  businessName:String;
  password:String;
  name:String;
  email:String;
  businessImg:String;
  city:String;
  constructor(
    private validateservice:ValidateService ,
    private hostAuth:HostAuthService, 
    private router:Router,
    private flashMessage:FlashMessagesService,

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
        this.router.navigate(['hostprofile'])
      }
      else
      {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger' , timeout:5000});  
        this.router.navigate[('hostlogin')]
      }
    })

  }


  OnRegisterSubmit(){
    const host = {
     name: this.name,
     email:this.email,
     businessName:this.businessName,
     password:this.password,
     businessImg:this.businessImg,
     city:this.city
    }
 
    //required fields
    if(!this.validateservice.validateRegister(host))
    {
     this.flashMessage.show("please fill  all fields" , {cssClass: 'alert-danger' , timeout:3000});
     
    }
    // validate Email 
    if(!this.validateservice.validateEmail(host.email))
    {
     this.flashMessage.show("please use a valid email", {cssClass: 'alert-danger' , timeout:3000});
     return false;
    }
 
    //Register user
    this.hostAuth.registerHost(host).subscribe(data =>{
     if(data)
     {
       this.flashMessage.show("You are now registered , You can log in", {cssClass: 'alert-success' , timeout:3000});
       this.router.navigate(['/hostlogin'])
     }
     else
     {
       this.flashMessage.show("Something went wrong", {cssClass: 'alert-danger' , timeout:3000});
       this.router.navigate(['/register'])
     }
    })
   }

}
