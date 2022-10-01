import { Component, OnInit } from '@angular/core';
import { EditUserProfileService } from '../services/edit-user-profile.service';
import { NgbModal , ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit {

  closeResult: string;
  imagePath:any='http://localhost:3000/';

  key =  localStorage.getItem("user")
  data = JSON.parse(this.key)
  id= this.data[Object.keys(this.data)[0]]

  public imagePathh;
  imgURL: any;
  public message: string;


  img;
  name;
  email;
  username;
  userImage;
  userData;

  testimage;
  constructor(private edituserprofileService:EditUserProfileService,
    private modealService:NgbModal,
    

    ) { }

  ngOnInit(): void {

    this.name = this.data[Object.keys(this.data)[1]]
    this.username = this.data[Object.keys(this.data)[2]]
    this.email = this.data[Object.keys(this.data)[3]]
    this.userImage = this.data[Object.keys(this.data)[5]]
    this.edituserprofileService.getUserProfile().subscribe((data)=> {
      this.userData=data;
    })
    
  }



  selectImage(event){
    this.img = event.target.files[0];
    this.testimage=event;

  }

  OnPostSubmit(){
    
    let formdata = new FormData();
    formdata.set("hostImage" , this.img)
    formdata.set("name" , this.name)
    formdata.set("email" , this.email)
    formdata.set("username" , this.username)

    
  

    

    this.edituserprofileService.updateUser(formdata).subscribe(res => {
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
