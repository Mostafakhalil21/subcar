import { Component, OnInit } from '@angular/core';
import { PopupService } from '../services/popup.service';
import { UserpostsService } from '../services/userposts.service';


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post;
  img;
  kms;
cartype;
carcolor;
caryear;
ownersnumber;
hostName;
desc;
price
imagePath:any='http://localhost:3000/';

  constructor(
    private userpostService:UserpostsService,
    ) { }

  ngOnInit(): void {
    
  
    this.userpostService.recivedpost().subscribe((data) => {
      this.post=data;
     this.img=this.post.img
     this.kms=this.post.kms
     this.cartype=this.post.cartype
     this.caryear=this.post.caryear
     this.ownersnumber=this.post.ownersnumber
     this.carcolor=this.post.carcolor
     this.hostName=this.post.hostName
     this.desc=this.post.desc
     this.price=this.post.price
    
    })


    
  
   
  

  }





  

}
