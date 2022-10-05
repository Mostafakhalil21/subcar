import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { AuthService } from '../services/auth.service';
import { UserpostsService } from '../services/userposts.service';
import { post } from '../models/posts.model';
import { DatePipe } from '@angular/common';
import {  FlashMessagesService } from 'flash-messages-angular';
import { NgModel } from '@angular/forms';
import { HostProfileComponent } from '../host-profile/host-profile.component';
import { NgbModal , ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BusinessProfileComponent } from '../business-profile/business-profile.component';
import { PopupService } from '../services/popup.service';
import { UserChatComponent } from '../user-chat/user-chat.component';
import { UserMapService } from '../services/user-map.service';
import { ChatService } from '../services/chat.service';
import { EditUserProfileComponent } from '../edit-user-profile/edit-user-profile.component';
import { EditUserProfileService } from '../services/edit-user-profile.service';
import { TestComponent } from '../test/test.component';
import { PostDetailsComponent } from '../post-details/post-details.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  key =  localStorage.getItem("user")
  data = JSON.parse(this.key)
  post:post[]=[];
  hosts:object;
  myDate = new Date();
  id= this.data[Object.keys(this.data)[0]]
  followingg = this.data[Object.keys(this.data)[4]]
hostsArray;

  mostliked;
  mostViewed;
  userData:any;
following:object;
closeResult = '';
public searchFilter: any = '';

code:any;
userId:any;
recommendedForMe:any=[]

isFollowing:boolean=false;

//user data
userImage;
name;
username;
email;
userFollowing;

imagePath:any='http://localhost:3000/';
  constructor(

    private router:Router,
    private authservice:AuthService,
    private userpost:UserpostsService,
    private flashMessage:FlashMessagesService,
    private modealService:NgbModal,
    private popupservice:PopupService,
    private usermapservice:UserMapService,
    private chatService:ChatService,
    private edituserprofileService:EditUserProfileService
  ) {  
     
  }
  addItem(newItem: string) {
    this.searchFilter=newItem;
  }
  ngOnInit(): void {
    console.log(this.recommendedForMe)
    this.userpost.mostliked().subscribe((data)=> {
      this.mostliked=data;
    })
    this.userpost.mostViewed().subscribe((data)=> {
      this.mostViewed=data;
    })
  this.usermapservice.recivedId().subscribe(data => {
    this.recommendedForMe=data;
  })
  this.edituserprofileService.getUserProfile().subscribe((data)=>{
    this.userData=data;
    this.userImage=this.userData.userImage;
    this.name=this.userData.name;
    this.username=this.userData.username;
    this.email=this.userData.email;
    this.userFollowing=this.userData.following.length
  })

  this.chatService.recivedId().subscribe(data => {
    this.code=data;
  })

    this.userpost.refreshNeeded$.subscribe(()=>{
      this.getallposts();
      this.getAllHosts();
      this.getfollowinghosts();
      // this.allhosts();

    });
    this.getallposts();
    this.getAllHosts();
    this.getfollowinghosts();
    
//  console.log(this.recommendedForMe)
  }
  



  checkifLiked(ArrayOfLikes){
    for(let i of ArrayOfLikes){
      if(i=== this.id){
        return true
      }
    }
    return false
  }
  byDate(a, b) {
    //chronologically by year, month, then day
    return new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf(); //timestamps
  }
  getallposts(){
    this.userpost.getFollowingPosts().subscribe((data) =>{
      let x = data;
      var merged = [].concat.apply([], x);
   
     merged.sort(this.byDate)
    merged.flat();
    merged.reverse();
    this.post=merged;
    
    })
    }
    getfollowinghosts(){
      this.userpost.getfollowerHosts().subscribe((data) =>{
        this.following=data;
      })
    }
    getAllHosts(){
      this.userpost.getAllHosts().subscribe((data) =>{
        this.hosts=data;
    
      })
    }

    // allhosts(){
    //   this.userpost.allhosts().subscribe((data)=> {
    //        this.hostsArray=data;
    //     this.checkIfFollowing()
    //     console.log(this.hostsArray)
    //   })
    // }
    checkIfFollowing(follower){
      for(let i of follower){
        if(i === this.id){
          return true
        }
      }
     
     return false
    }
followHost(host){
  this.userpost.followHost(host).subscribe((data)=> {
   location.reload();
  })
}
unfollowHost(host){
  this.userpost.UnfollowHost(host).subscribe((data)=> {
    location.reload();
  })

}


refresh(): void {
  window.location.reload();
}

sendhostdetails(hostid){
this.popupservice.sendId(hostid)
this.chatService.sendId(hostid)
// console.log(hostid)

}

likepost(postId){
  this.userpost.likePost(postId).subscribe((data) => {
  })
}

sendreplay(userId,code){
this.code=code;
this.userId=userId;
}



sendSubmit(){
    
  const sendReplay = {
    sender:this.id,
    receiver:this.userId,
    message:this.code+` Hi im interested in this Car can we talk ? `
  }
  this.chatService.createMessage(sendReplay).subscribe(res => {
   this.openMessages();
    
   })
   
}

sendpostid(postId){
  this.userpost.sendpost(postId);
}
openMessages(){
  this.modealService.open(UserChatComponent, {size: 'lg'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

open() {
  this.modealService.open(BusinessProfileComponent, {size: 'xl'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
  openView() {
  
    this.modealService.open(PostDetailsComponent, {size: 'lg'}).result.then((result) => {
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
openEdit() {
  
  this.modealService.open(EditUserProfileComponent, {size: 'lg'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

increaceView(id){
  this.userpost.icreaceView(id).subscribe((data)=> {
    console.log("increased")
  })
}


}




