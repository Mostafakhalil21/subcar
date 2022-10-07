import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../services/validate.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { HostAuthService } from '../services/host-auth.service';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { HostRegisterService } from '../services/host-register.service';
@Component({
  selector: 'app-host-register',
  templateUrl: './host-register.component.html',
  styleUrls: ['./host-register.component.css']
})
export class HostRegisterComponent implements OnInit {
  public imagePathh;
  imgURL: any;
  public message: string;

  businessName;
  password;
  name;
  email;
  businessImg;
  desc;
  phone;
  city;
  from

 

  constructor(
    private validateservice:ValidateService ,
    private flashMessage:FlashMessagesService,
    private hostregisterService:HostRegisterService,
    private router:Router,
    private http:HttpClient
  ) { }

  ngOnInit(): void {

  }
  


  selectImage(event){
    this.businessImg = event.target.files[0];
   
  }
  OnRegisterSubmit(){
    let formdata = new FormData();
    formdata.set("name" , this.name)
    formdata.set("email" , this.email)
    formdata.set("businessName" , this.businessName)
    formdata.set("password" , this.password)
    formdata.set("hostImage" , this.businessImg)
   
    formdata.set("from" , this.from)
    formdata.set("city" , this.city)
    formdata.set("phone" , this.phone)
    formdata.set("desc" , this.desc)



 
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
    this.hostregisterService.registerHost(formdata).subscribe(data =>{
     if(data)
     {
       this.flashMessage.show("You are now registered , You can log in", {cssClass: 'alert-success' , timeout:3000});
       this.router.navigate(['/hostlogin'])
       
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
