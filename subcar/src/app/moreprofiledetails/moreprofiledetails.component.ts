import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HostAuthService } from '../services/host-auth.service';
import { PopupService } from '../services/popup.service';
import { NgbModal , ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ChatComponent } from '../chat/chat.component';
import { ChatService } from '../services/chat.service';
import { UserpostsService } from '../services/userposts.service';
import { UserChatComponent } from '../user-chat/user-chat.component';


@Component({
  selector: 'app-moreprofiledetails',
  templateUrl: './moreprofiledetails.component.html',
  styleUrls: ['./moreprofiledetails.component.css']
})
export class MoreprofiledetailsComponent implements OnInit {
  hostId ;
  array=[];
  host;
  postsArray=[];
  hostPostArray=[];
  counter=0;
  closeResult = '';
  imagePath:any='http://localhost:3000/';
  USER;
  isFollowing:boolean=false;

//display user details 

businessImg;
desc;
name;
businessName;
email;
phone;
city;
follower;
followersLength;
public searchFilter: any = '';



//*********** */
userId:any;
code:any;


  key =  localStorage.getItem("user")
  data = JSON.parse(this.key)
  id= this.data[Object.keys(this.data)[0]]
  followingg = this.data[Object.keys(this.data)[4]]

  constructor(
    private  actRoute:ActivatedRoute,
    private popupservice:PopupService,
    private modealService:NgbModal,
    private chatService:ChatService,
    private userpost:UserpostsService

    ) { }
    addItem(newItem: string) {
      this.searchFilter=newItem;
    }
  ngOnInit(): void {

    this.checkiffollow();

    this.userpost.refreshNeeded$.subscribe(()=>{
      this.getallposts();
      this.getAllHosts();

 
    })
    this.hostId = this.actRoute.snapshot.params['_id'];
    this.getAllHosts();
    this.getallposts();
    console.log(this.counter)

    this.chatService.recivedId().subscribe(data => {
      this.code=data;
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
    openMessages(){
      this.modealService.open(UserChatComponent, {size: 'lg'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }


  followHost(){
    this.userpost.followHost(this.hostId).subscribe((data)=> {
     location.reload();
    })
  }

  unfollowHost(){
    this.userpost.UnfollowHost(this.hostId).subscribe((data)=> {
      location.reload();
    })
  
  }



  getAllHosts(){
    this.popupservice.getallhosts().subscribe((data) => {
      this.array=data;
      this.searchHost();
    })
  }
  searchHost(){
    for(let i of this.array){
      if(i._id==this.hostId){
        this.host=i;
        this.businessImg=i.businessImg;
        this.email=i.email;
        this.follower=i.follower;
        this.name=i.name;
        this.desc=i.desc;
        this.city=i.city;
        this.businessName=i.businessName;
        this.followersLength=i.follower.length
      }
    }
  }

checkiffollow(){
  this.popupservice.getuser().subscribe((data)=> {
    this.USER=data
    if(this.USER.following.includes(this.hostId)){
      this.isFollowing=true;
      
    }
  })
}

  checkifLiked(ArrayOfLikes){
    for(let i of ArrayOfLikes){
      if(i=== this.id){
        return true
        
      }
    }
    return false
  }

 
  getallposts(){
    this.popupservice.getallPosts().subscribe((data) =>{
      let flatData=data.flat();
      this.postsArray=flatData.reverse();;
      this.searchposts();
      
    })
  }
  searchposts(){
    for(let i of this.postsArray){
      if(i.userId==this.hostId){
        this.hostPostArray.push(i);
      if(i.likes.length >0){
         this.counter+=i.likes.length;
      }
      }
    }
  
  }
  sendhostdetails(hostid){
    this.chatService.sendId(hostid)
      
    }

    likepost(postId){
      this.userpost.likePost(postId).subscribe((data) => {
        location.reload();
      })
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
