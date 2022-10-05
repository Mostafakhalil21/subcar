import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-edit-post-img',
  templateUrl: './edit-post-img.component.html',
  styleUrls: ['./edit-post-img.component.css']
})
export class EditPostImgComponent implements OnInit {

  img;
postId;


public imagePathh;
imgURL: any;
public message: string;

  constructor(
    private postservice:PostsService

  ) { }

  ngOnInit(): void {
    this.postservice.recivedpost().subscribe(data => {
      this.postId=data;
  
    })
  }


  
 editPostImage(){

  let formdata = new FormData();
  formdata.set("hostImage" , this.img)

  this.postservice.editPostImage(this.postId,formdata).subscribe(res => {
    location.reload();
    
  })
 }
 selectImage(event){
  this.img = event.target.files[0];
 
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

}
