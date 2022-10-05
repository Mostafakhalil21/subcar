import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-pop-up',
  templateUrl: './post-pop-up.component.html',
  styleUrls: ['./post-pop-up.component.css']
})
export class PostPopUpComponent implements OnInit {
  key =  localStorage.getItem("host")
 data = JSON.parse(this.key)
 id= this.data[Object.keys(this.data)[0]]
 name = this.data[Object.keys(this.data)[2]]
 businessImg = this.data[Object.keys(this.data)[4]]
 img;
 cartype;
 kms;
 ownersnumber;
 carcolor;
 caryear;
 desc;
 price;



 code;
  constructor(
    private postservice:PostsService,) {
    
   }

  ngOnInit(): void {

    this.postservice.getallcodes().subscribe((data) => {
      console.log(data)
      let random = Math.floor(Math.random() * 1000000);
      console.log(random)
          while(data.includes(random)){
              random = Math.floor(Math.random() * 1000000);
          }
          this.code=random;
          console.log(this.code)
    })
    
  }

  selectImage(event){
    this.img = event.target.files[0];
    console.log(event)
   
  }




//  getRandomInt(max) {
    
//     let random = Math.floor(Math.random() * max);
//     console.log(random)
//         while(this.arr.includes(random)){
//             random = Math.floor(Math.random() * max);
//         }
//     return random
//   }

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
    formdata.set("price" , this.price)
    formdata.set("code" , this.code)

    

    this.postservice.createPost(formdata).subscribe(res => {
     console.log("works")
     window.location.reload()
     
    })
 }

}
