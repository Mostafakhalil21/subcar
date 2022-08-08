import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../services/validate.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { HostAuthService } from '../services/host-auth.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-host-register',
  templateUrl: './host-register.component.html',
  styleUrls: ['./host-register.component.css']
})
export class HostRegisterComponent implements OnInit {

  name:String;
  businessName:String;
  email:String;
  password:String;
  businessImg:String;
  city:String;
  constructor(
    private validateservice:ValidateService ,
    private flashMessage:FlashMessagesService,
    private hostAuth:HostAuthService,
    private router:Router
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
       this.router.navigate(['/login'])
     }
     else
     {
       this.flashMessage.show("Something went wrong", {cssClass: 'alert-danger' , timeout:3000});
       this.router.navigate(['/register'])
     }
    })
   }
  

}
