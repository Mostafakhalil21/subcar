import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { post } from '../models/posts.model';
import { PostsService } from '../services/posts.service';


@Component({
  selector: 'app-host-dashboard',
  templateUrl: './host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.css']
  
})
export class HostDashboardComponent implements OnInit {
key =  localStorage.getItem("host")

 data = JSON.parse(this.key)

  img:String;
  desc:String;
post=new post("","","","","","","","","","",)
  constructor(
    private router:Router,
    private postsservice:PostsService
    ) { }

  ngOnInit(): void {
    
  }
// this.data[Object.keys(this.data)[0]]

  OnPostSubmit(){
     this.postsservice.createPost(this.post).subscribe(res => {
      console.log("works")
      
     })
  }

}
