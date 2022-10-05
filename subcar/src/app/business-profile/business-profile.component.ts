import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatComponent } from '../chat/chat.component';
import { ChatService } from '../services/chat.service';
import { HostAuthService } from '../services/host-auth.service';
import { PopupService } from '../services/popup.service';
import { PostsService } from '../services/posts.service';
import { UserpostsService } from '../services/userposts.service';

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
  key =  localStorage.getItem("user")
  data = JSON.parse(this.key)
  id = this.data[Object.keys(this.data)[0]]
  closeResult = '';


  hostId;
  businessImg;
  userDetails;
  name;
  city;
  phone;
  desc;
  followersLength;


  isFollowing:boolean=false;
  
  imagePath:any='http://localhost:3000/';
  constructor(
    private popupservice:PopupService,
    private userpost:UserpostsService,
    private modealService:NgbModal,
    private chatservice:ChatService



    
    
  ) { }

  ngOnInit(): void {


   

    
     this.gethostdetails();
     this.getallposts();

    this.popupservice.recivedId().subscribe((data)=>{
      this.message=data;
    })

  }

  followHost(host){
    this.userpost.followHost(host).subscribe((data)=> {
      this.modealService.dismissAll();
     
    })
  }
  unfollowHost(host){
    this.userpost.UnfollowHost(host).subscribe((data)=> {
     this.modealService.dismissAll();
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
          if(i.follower.includes(this.id)){
            this.isFollowing=true;
          }
        this.hostId=i._id;
        this.businessImg=this.host.businessImg;
        this.followersLength=i.follower.length;
        this.name=i.name;
        this.city=i.city;
        this.phone=i.phone;
        this.desc=i.desc;
        
      }
    }
  }

  getuserdetails(){
    this.popupservice.getuser().subscribe((data)=> {
this.userDetails=data;
    })
  }
  sendhostdetails(hostid){
    this.chatservice.sendId(hostid)
      
    }


  
  open() {
    this.modealService.open(ChatComponent, {size: 'lg'}).result.then((result) => {
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

}
