import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message;
  id;
  key =  localStorage.getItem("user")
  data = JSON.parse(this.key)
  userid= this.data[Object.keys(this.data)[0]]
  constructor(private chatservice:ChatService) { }

  ngOnInit(): void {
    this.chatservice.recivedId().subscribe((data)=>{
      this.id=data;
      console.log(this.id)
    })
    
  }



  sendSubmit(){
    
    const message = {
      sender:this.userid,
      receiver:this.id,
      message:this.message
    }
    this.chatservice.createMessage(message).subscribe(res => {
      console.log("works")
      
     })
     console.log("works")
  }
}
