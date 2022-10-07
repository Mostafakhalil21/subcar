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
  username;
  password;
  name;
  email;
  userImage;
  public imagePathh;
  imgURL: any;
  public message: string;
  
  constructor(
    private validateservice:ValidateService ,
    private flashMessage:FlashMessagesService,
    private authservice:AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {
    
  }


  selectImage(event){
    this.userImage = event.target.files[0];
   
  }
  OnRegisterSubmit(){
    let formdata = new FormData();
    formdata.set("name" , this.name)
    formdata.set("email" , this.email)
    formdata.set("username" , this.username)
    formdata.set("password" , this.password)
    formdata.set("hostImage" , this.userImage)
    
 
 
    //required fields
    if(!this.validateservice.validateRegister(formdata))
    {
    
     
    }
    // validate Email 
    if(!this.validateservice.validateEmail(formdata.get("email")))
    {
     this.flashMessage.show("please use a valid email", {cssClass: 'alert-danger' , timeout:3000});
     return false;
    }
 
    //Register user
    this.authservice.registerUser(formdata).subscribe(data =>{
     if(data)
     {
       this.flashMessage.show("You are now registered , You can log in", {cssClass: 'alert-success' , timeout:3000});
       this.router.navigate(['/login'])
       location.reload();
     }
     else
     {
       this.flashMessage.show("Something went wrong", {cssClass: 'alert-danger' , timeout:3000});
       this.router.navigate(['/about'])
     }
    })
   }

   preview(files) {
    if (files.length === 0)
      return;
  
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
  
    var reader = new FileReader();
    this.imagePathh = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

}
