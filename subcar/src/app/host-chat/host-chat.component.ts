import { Component, OnInit } from '@angular/core';
import { HostChatService } from '../services/host-chat.service';

@Component({
  selector: 'app-host-chat',
  templateUrl: './host-chat.component.html',
  styleUrls: ['./host-chat.component.css']
})
export class HostChatComponent implements OnInit {

  
  message;
  receiverId;
 arraycontent:any=[]
 usersArray:any=[];
 filteredUsersArray:any=[]

 imagePath:any='http://localhost:3000/';

 newUsersArray:any=[]
 key =  localStorage.getItem("host")
 data = JSON.parse(this.key)
 id= this.data[Object.keys(this.data)[0]]

 contentMessagesArray:any=[];
 MyContentArray:any=[];
 newMyContentArray:any=[];
 messagesArray:any=[];
  constructor(
    private hostchatService:HostChatService
  ) { }

  ngOnInit(): void {
    this.hostchatService.recivedId().subscribe((data)=>{
      this.receiverId=data;
      
      
    })
  this.getallusers();
this.getallMessagesForHost();
console.log(this.newUsersArray)




  }

  getallusers(){
    this.hostchatService.getallUsers().subscribe((data) => {
      this.usersArray=data;
 
      for(let i  of this.usersArray){
        for(let j = 0 ; j<this.MyContentArray.length;j++){
            if(i._id==this.MyContentArray[j]){
          this.newUsersArray.push(i)
        }
    
        }
     
      }

    })
  
  }


  getallMessagesForHost(){
    this.hostchatService.getAllMessagesForAHost().subscribe(messages => {
      this.contentMessagesArray=messages;
      this.searchSenders();
      this.getallusers();
     
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
    this.hostchatService.sendId(hostid)
 
    
      
    }

  getsendermessages(id){
this.hostchatService.getsendermessages(id).subscribe((data) => {
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
    this.hostchatService.createMessage(message).subscribe(res => {
      console.log("works")
      
     })
     this.message = '';
   
  }


}
