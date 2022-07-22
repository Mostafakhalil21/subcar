import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:String;
  username:String;
  email:String;
  password:String;
  
  constructor(
    private validateservice:ValidateService ,
    private flashMessage:FlashMessagesService,
    private authservice:AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {
    
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
