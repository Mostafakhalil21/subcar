import { Component, OnInit } from '@angular/core';
import { HostAuthService } from '../services/host-auth.service';
import { FormControl, FormGroup } from '@angular/forms'
import { EditHostProfileService } from '../services/edit-host-profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-edit-host-profile',
  templateUrl: './edit-host-profile.component.html',
  styleUrls: ['./edit-host-profile.component.css']
})
export class EditHostProfileComponent implements OnInit {
  host;
  userImage;
  img;
  name;
  businessName;
  password;
  businessImg;
  desc;
  from;
  phone;
  city;
  email;

  public imagePathh;
  imgURL: any;
  public message: string;
  
  key =  localStorage.getItem("host")
  data = JSON.parse(this.key)
  id= this.data[Object.keys(this.data)[0]]
  imagePath:any='http://localhost:3000/';
  constructor(
    private hostAuth:HostAuthService,
    private edithostservice:EditHostProfileService,
    private modealService:NgbModal,

    ) { }

  ngOnInit(): void {
    this.name = this.data[Object.keys(this.data)[1]]
    this.businessName = this.data[Object.keys(this.data)[2]]
    this.email = this.data[Object.keys(this.data)[3]]
    this.businessImg = this.data[Object.keys(this.data)[4]]
    this.phone = this.data[Object.keys(this.data)[6]]
    this.city = this.data[Object.keys(this.data)[7]]
    this.from = this.data[Object.keys(this.data)[8]]
    this.desc = this.data[Object.keys(this.data)[9]]
    this.edithostservice.gethostprofile().subscribe(profile =>{
      this.host=profile[0];
      console.log(this.host)
    },
    err =>{
      console.log(err);
      return false;
    })
  }

  selectImage(event){
    this.img = event.target.files[0];
   
  }

  OnPostSubmit(){
    
      let formdata = new FormData();
      formdata.set("hostImage" , this.img)
      formdata.set("name" , this.name)
      formdata.set("email" , this.email)
      formdata.set("businessName" , this.businessName)
      formdata.set("from" , this.from)
      formdata.set("city" , this.city)
      formdata.set("phone" , this.phone)
      formdata.set("desc" , this.desc)
      
    
  
      
  
      this.edithostservice.updateHost(formdata).subscribe(res => {
        this.modealService.dismissAll();
        location.reload();
       
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
  X(){
    this.modealService.dismissAll();
  }

}
