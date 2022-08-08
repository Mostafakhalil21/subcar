import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { ValidateService } from '../services/validate.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:String;
  password:String;
  name:String;
  email:String;

  constructor(
    private validateservice:ValidateService ,
    private authservice:AuthService,
    private authServer:AuthService, 
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
  
    const user = {
      username :this.username,
      password:this.password
    }

    this.authServer.authenticateUser(user).subscribe(data =>{
      if(data.success)
      {
        this.authServer.storeUserData(data.token , data.user);
        this.flashMessage.show('You are now logged in' , {
          cssClass: 'alert-success',
          timeout:5000
        });
        this.router.navigate(['home'])
      }
      else
      {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger' , timeout:5000});  
        this.router.navigate[('login')]
      }
    })

  }

  OnRegisterSubmit(){
    const user = {
     name: this.name,
     email:this.email,
     username:this.username,
     password:this.password
    }
 
    //required fields
    if(!this.validateservice.validateRegister(user))
    {
     this.flashMessage.show("please fill  all fields" , {cssClass: 'alert-danger' , timeout:3000});
     
    }
    // validate Email 
    if(!this.validateservice.validateEmail(user.email))
    {
     this.flashMessage.show("please use a valid email", {cssClass: 'alert-danger' , timeout:3000});
     return false;
    }
 
    //Register user
    this.authservice.registerUser(user).subscribe(data =>{
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
