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
 array:any=[];
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
    this.filterUsers();
  this.getallusers();

this.getallMessagesForHost();
console.log(this.MyContentArray)
console.log(this.messagesArray)
console.log(this.filteredUsersArray.length)

this.hostchatService.recivedId().subscribe((data)=>{
  this.receiverId=data;
  console.log(this.receiverId)
})

  }

  getallusers(){
    this.hostchatService.getallUsers().subscribe((data) => {
      this.usersArray=data;
      this.swap();
      
    })
  }

  swap(){
    for(let i of this.usersArray){
      this.array.push(i)
    }
   
  }

  getallMessagesForHost(){
    this.hostchatService.getAllMessagesForAHost().subscribe(messages => {
      this.contentMessagesArray=messages;
      this.searchSenders();
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
  

  filterUsers(){
for(let i=0 ;i <this.array.length;i++){

   this.filteredUsersArray.push("hi")

}
   
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
