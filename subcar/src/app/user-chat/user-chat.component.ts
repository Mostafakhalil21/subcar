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
  
  
  constructor(
    private userchatService:UserChatService
  ) { }

  ngOnInit(): void {


    this.userchatService.refreshNeeded$.subscribe(()=>{
      this.getallMessagesForHost();
      this.searchSenders();
      
      
    });
    this.userchatService.recivedId().subscribe((data)=>{
      this.receiverId=data;
      console.log(this.receiverId)
    })
    
    this.getallMessagesForHost();

  }
  getallMessagesForHost(){
    this.userchatService.getAllMessagesForAHost().subscribe(messages => {
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
