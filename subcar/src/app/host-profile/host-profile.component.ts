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


@Component({
  selector: 'app-host-profile',
  templateUrl: './host-profile.component.html',
  styleUrls: ['./host-profile.component.css']
})
export class HostProfileComponent implements OnInit {
  key =  localStorage.getItem("host")
 data = JSON.parse(this.key)
 id= this.data[Object.keys(this.data)[0]]
 name = this.data[Object.keys(this.data)[2]]
 businessImg = this.data[Object.keys(this.data)[4]]
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

  closeResult = '';

  imagePath:any='http://localhost:3000/';



  postsArray=[];
  hostPostArray=[];
  counter=0;





  constructor(
    private hostAuth:HostAuthService,
    private route:Router,
    private postservice:PostsService,
    private modealService:NgbModal,
    
    
  ) { }

  ngOnInit(): void {




    
    this.hostAuth.getProfile().subscribe(profile =>{
      this.host=profile.user;
      console.log(profile.user)
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



  selectImage(event){
    this.img = event.target.files[0];
   
  }


  getallposts(){
  this.postservice.getPosts().subscribe((data) =>{
    let flatData=data.flat();
    flatData.reverse();
    this.post=flatData;
    this.postsArray=flatData;
    this.searchposts();
  })
  }

  searchposts(){
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



