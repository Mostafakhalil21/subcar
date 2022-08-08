import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HostAuthService } from '../services/host-auth.service';
import { PostsService } from '../services/posts.service';
import { post } from '../models/posts.model';


@Component({
  selector: 'app-host-profile',
  templateUrl: './host-profile.component.html',
  styleUrls: ['./host-profile.component.css']
})
export class HostProfileComponent implements OnInit {
  key =  localStorage.getItem("host")
 data = JSON.parse(this.key)
 img:String;
 desc:String;
 Post=new post("","","","","","","","","","")
  host:object;
  post:post[]=[];
  constructor(
    private hostAuth:HostAuthService,
    private route:Router,
    private postservice:PostsService,
    
    
  ) { }

  ngOnInit(): void {
    this.getallposts();

    this.hostAuth.getProfile().subscribe(profile =>{
      this.host=profile.user;
      console.log(profile.user)
    },
    err =>{
      console.log(err);
      return false;
    })

  }


  getallposts(){
  this.postservice.getPosts().subscribe((data) =>{
    this.post=data;
  })
  }

  OnPostSubmit(){
    this.postservice.createPost(this.Post).subscribe(res => {
     console.log("works")
     
    })
 }

}
