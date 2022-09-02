import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HostAuthService } from '../services/host-auth.service';
import { PopupService } from '../services/popup.service';

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



  constructor(
    private  actRoute:ActivatedRoute,
    private popupservice:PopupService
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

}
