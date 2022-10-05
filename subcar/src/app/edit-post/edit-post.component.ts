import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  img;
  cartype;
  kms;
  ownersnumber;
  carcolor;
  caryear;
  desc;
  price;
  post;
postId;

  key=localStorage.getItem('host')
  data = JSON.parse(this.key)
  id= this.data[Object.keys(this.data)[0]]

  constructor(
    private postService:PostsService,
    private modealService:NgbModal
  ) { }

  ngOnInit(): void {
    
    this.postService.recivedpost().subscribe((data)=> {
      this.post=data;
      this.postId=this.post._id
      this.kms=this.post.kms
      this.cartype=this.post.cartype
      this.ownersnumber=this.post.ownersnumber
      this.carcolor=this.post.carcolor
      this.caryear=this.post.caryear
      this.desc=this.post.desc
      this.price=this.post.price
      this.kms=this.post.kms
 
    })

  }
  X(){
    this.modealService.dismissAll();
  }
  editpost(){

    const newPost ={
      userId:this.id,
      kms:this.kms,
      cartype:this.cartype,
      ownersnumber:this.ownersnumber,
      carcolor:this.carcolor,
      caryear:this.caryear,
      desc:this.desc,
      price:this.price
    }

    this.postService.editpost(this.postId,newPost).subscribe(data => {
      location.reload()
    })

  }

}
