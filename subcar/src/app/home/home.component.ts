import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { AuthService } from '../services/auth.service';
import { UserpostsService } from '../services/userposts.service';
import { post } from '../models/posts.model';
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';
import { HostAuthService } from '../services/host-auth.service';
import { FlashMessagesComponent, FlashMessagesService } from 'flash-messages-angular';
import { NgModel } from '@angular/forms';
import { HostProfileComponent } from '../host-profile/host-profile.component';










@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  key =  localStorage.getItem("user")
  data = JSON.parse(this.key)
  user:object;
  post:post[]=[];
  hosts:object;
  myDate = new Date();
  id= this.data[Object.keys(this.data)[0]]
  name = this.data[Object.keys(this.data)[1]];
  username = this.data[Object.keys(this.data)[2]]
  userImage = this.data[Object.keys(this.data)[5]]
following:object;
closeResult = '';

imagePath:any='http://localhost:3000/';
  constructor(

    private router:Router,
    private authservice:AuthService,
    private userpost:UserpostsService,
    private hostAuth:HostAuthService,
    private flashMessage:FlashMessagesService,
  

    
  ) { 
    
  }

  ngOnInit(): void {
    this.userpost.refreshNeeded$.subscribe(()=>{
      this.getallposts();
      this.getAllHosts();
      this.getfollowinghosts();
    });
    this.getallposts();
    this.getAllHosts();
    this.getfollowinghosts();
    
 
  }



  getallposts(){
    this.userpost.getFollowingPosts().subscribe((data) =>{
    let flatData=data.flat();
    flatData.reverse();
    this.post=flatData;
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
followHost(host){
  this.userpost.followHost(host).subscribe((data)=> {
   
  })
  console.log(host)
}
unfollowHost(host){
  this.userpost.UnfollowHost(host).subscribe((data)=> {
   
  })
  console.log(host)
}

refresh(): void {
  window.location.reload();
}

sendhostdetails(hostid){
this.hostAuth.gethostdetails(hostid)
  console.log(hostid);
}

onLogoutClick(){
  this.authservice.logout();
  this.flashMessage.show('You are logged out' , {
    cssClass:'alert-success',
    timeout:3000
  });
  this.router.navigate(['/login']);
  return false;
}

likepost(postId){
  this.userpost.likePost(postId).subscribe((data) => {
  })
}
// open() {
//   this.modalService.model.open(HostProfileComponent, {size: 'lg'}).result.then((result) => {
//     this.closeResult = `Closed with: ${result}`;
//   }, (reason) => {
//     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//   });
  
// }
// private getDismissReason(reason: any): string {
//   if (reason === ModalDismissReasons.ESC) {
//     return 'by pressing ESC';
//   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//     return 'by clicking on a backdrop';
//   } else {
//     return `with: ${reason}`;
//   }
// }

}


