import { Component, OnInit } from '@angular/core';
import { UserChatService } from '../services/user-chat.service';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {
  message;
  key=localStorage.getItem('user')
  data = JSON.parse(this.key)
  id= this.data[Object.keys(this.data)[0]]
 messagesArray:any=[];
  receiverId;
  contentMessagesArray:any=[];
 MyContentArray:any=[];

 newHostsArray:any=[]
HostsArray:any=[];
 imagePath:any='http://localhost:3000/';
  
img;
hostBusinessName;
 hostdetails;
 public searchFilter: any = '';

  constructor(
    private userchatService:UserChatService
  ) { }

  ngOnInit(): void {
     
    this.userchatService.recivedId().subscribe((data)=>{
      this.receiverId=data;
      for(let i of this.newHostsArray){
        if(i._id == this.receiverId){
        this.hostdetails=i;
        this.img=this.hostdetails.businessImg
        this.hostBusinessName=this.hostdetails.businessName;
        }
      }
    })

    
    this.getallHosts();
    this.getallMessagesForHost();

  }

  getallHosts(){
    this.userchatService.getAllHosts().subscribe((data) => {
      this.HostsArray=data;
 
      for(let i  of this.HostsArray){
        for(let j = 0 ; j<this.MyContentArray.length;j++){
            if(i._id==this.MyContentArray[j]){
          this.newHostsArray.push(i)
        }
    
        }
     
      }

    })
  
  }

  getallMessagesForHost(){
    this.userchatService.getAllMessagesForAHost().subscribe(messages => {
      this.contentMessagesArray=messages;
      this.searchSenders();
      this.getallHosts();
    })
  }

  searchSenders(){
    for(let i of this.contentMessagesArray){
      if(this.id == i.sender){
        if(!this.MyContentArray.includes(i.receiver)){
          this.MyContentArray.push(i.receiver)
        }
      }else{
        if(!this.MyContentArray.includes(i.sender)){
          this.MyContentArray.push(i.sender)
        }
      }
    }
    this.MyContentArray.reverse();
  }

  sendUserdetails(hostid){
    this.userchatService.sendId(hostid)
    
      
    }

  getsendermessages(id){
    this.userchatService.getsendermessages(id).subscribe((data) => {
    this.messagesArray=data;
    this.messagesArray.reverse();
    })
      }
      


      sendSubmit(){
          
        const message = {
          sender:this.id,
          receiver:this.receiverId,
          message:this.message
        }
        this.userchatService.createMessage(message).subscribe(res => {
          console.log("works")
          
         })
         this.message = '';
       
      }

     

}
