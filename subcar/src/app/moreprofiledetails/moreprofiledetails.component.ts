import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HostAuthService } from '../services/host-auth.service';
import { PopupService } from '../services/popup.service';
import { NgbModal , ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ChatComponent } from '../chat/chat.component';
import { ChatService } from '../services/chat.service';


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

  constructor(
    private  actRoute:ActivatedRoute,
    private popupservice:PopupService,
    private modealService:NgbModal,
    private chatService:ChatService

    ) { }

  ngOnInit(): void {
    this.hostId = this.actRoute.snapshot.params['_id'];
    this.getAllHosts();
    this.getallposts();
    console.log(this.counter)
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
      }
    }
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
