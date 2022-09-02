import { Component, OnInit } from '@angular/core';
import { HostAuthService } from '../services/host-auth.service';
import { PopupService } from '../services/popup.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent implements OnInit {
  message:String
  hosts:object;
  array=[];
  host:any;
  counter=0;
  postsArray=[];
  hostPostArray=[];
  constructor(
    private popupservice:PopupService,
    
  ) { }

  ngOnInit(): void {
     this.gethostdetails();
     this.getallposts();

    this.popupservice.recivedId().subscribe((data)=>{
      this.message=data;
    })
  }


  gethostdetails(){
    this.popupservice.getallhosts().subscribe((data) => {
      this.array=data;
      this.searchHost();
    })
  }
  getallposts(){
    this.popupservice.getallPosts().subscribe((data) =>{
      this.postsArray=data;
      this.searchposts();
    })
  }
  searchposts(){
    for(let i of this.postsArray){
      if(i.userId==this.message){
        this.hostPostArray.push(i);
      if(i.likes.length >0){
         this.counter+=i.likes.length;
      }
      }
    }
  
  }

  searchHost(){
    for(let i of this.array){
      if(i._id==this.message){
        this.host=i;
      }
    }
  }

}
