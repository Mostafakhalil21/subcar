import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HostAuthService } from '../services/host-auth.service';
import { PostsService } from '../services/posts.service';
import { post } from '../models/posts.model';
import { NgbModal , ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PostPopUpComponent } from '../post-pop-up/post-pop-up.component';
import { EditHostProfileComponent } from '../edit-host-profile/edit-host-profile.component';
import { HostChatComponent } from '../host-chat/host-chat.component';
import { HostChatService } from '../services/host-chat.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { LatlonService } from '../services/latlon.service';


@Component({
  selector: 'app-host-profile',
  templateUrl: './host-profile.component.html',
  styleUrls: ['./host-profile.component.css']
})
export class HostProfileComponent implements OnInit {
  key =  localStorage.getItem("host")
 data = JSON.parse(this.key)
 id= this.data[Object.keys(this.data)[0]]
 name = this.data[Object.keys(this.data)[1]]
 busnessName = this.data[Object.keys(this.data)[2]]
 email = this.data[Object.keys(this.data)[3]]
 businessImg = this.data[Object.keys(this.data)[4]]
 follower = this.data[Object.keys(this.data)[5]]
 phone = this.data[Object.keys(this.data)[6]]

 img;
 
 Post=new post("","","","","","","","","","")
  host:object;
  post:post[]=[];

  cartype;
  kms;
  ownersnumber;
  carcolor;
  caryear;
  desc;
  lat;
  lon;
  closeResult = '';

  imagePath:any='http://localhost:3000/';

  public searchFilter: any = '';


  postsArray=[];
  hostPostArray=[];
  counter=0;





  constructor(
    private hostAuth:HostAuthService,
    private route:Router,
    private postservice:PostsService,
    private modealService:NgbModal,
    private flashMessage:FlashMessagesService,
    private latlonService:LatlonService
    
    
  ) { }

  ngOnInit(): void {



    
    this.hostAuth.gethostprofile(this.id).subscribe(profile =>{
      this.host=profile[0];
      
    },
    err =>{
      console.log(err);
      return false;
    })

    this.postservice.refreshNeeded$.subscribe(()=>{
      this.getallposts();
    })
    this.getallposts();

  }


  // ------------------- //

  deletepost(id){
    if(confirm("Are you sure to delete ")) {
      this.postservice.deletePost(id).subscribe((data)=> {
        location.reload();
      })
    }

 }



  addItem(newItem: string) {
    this.searchFilter=newItem;
  }

  addLocation(){
    if(!navigator.geolocation){
      console.log("location is not supported");
    }

    if(confirm("Are you sure you want to Locate/Relocate you'r business on map ?")) {
navigator.geolocation.getCurrentPosition((position) => {
  const coords = position.coords;
  this.lat=coords.latitude;
  this.lon=coords.longitude;
  console.log(coords)

  const lonlat = {
    lat:this.lat,
    lon:this.lon
  }

  this.latlonService.updatelatlon(lonlat).subscribe(data => {
    if(data){
      this.flashMessage.show("You have successfuly added your business on map", {cssClass: 'alert-success' , timeout:3000});

    }  else
    {
      this.flashMessage.show("Something went wrong", {cssClass: 'alert-danger' , timeout:3000});
    }
  })
})
    }
  }


  selectImage(event){
    this.img = event.target.files[0];
   
  }


  getallposts(){
  this.postservice.getPosts().subscribe((data) =>{
    let flatData=data.flat();
    flatData.reverse();
    this.post=flatData;
    this.postsArray=flatData;
    this.countposts();
  })
  }

  countposts(){
    for(let i of this.postsArray){
         this.counter+=i.likes.length; 
    }
  
  }

  OnPostSubmit(){
    let formdata = new FormData();
    formdata.set("hostName" , this.name)
    formdata.set("userId" , this.id)
    formdata.set("businessImg" , this.businessImg)
    formdata.set("hostImage" , this.img)
    formdata.set("cartype" , this.cartype)
    formdata.set("kms" , this.kms)
    formdata.set("ownersnumber" , this.ownersnumber)
    formdata.set("carcolor" , this.carcolor)
    formdata.set("caryear" , this.caryear)
    formdata.set("desc" , this.desc)
    

    this.postservice.createPost(formdata).subscribe(res => {
     console.log("works")
     
    })
 }



 open() {
  this.modealService.open(PostPopUpComponent, {size: 'lg'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

openEdit() {
  this.modealService.open(EditHostProfileComponent, {size: 'lg'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}


private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}

openMessages(){
  this.modealService.open(HostChatComponent, {size: 'lg'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

}



