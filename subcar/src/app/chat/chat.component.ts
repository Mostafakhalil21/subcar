import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'flash-messages-angular';
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

  constructor(private chatservice:ChatService ,
    private flashMessage:FlashMessagesService,
    private modealService:NgbModal,

    ) { }

  ngOnInit(): void {
    this.chatservice.recivedId().subscribe((data)=>{
      this.id=data;
      console.log(this.id)
    })
    
  }

  missall(){
   location.reload();
  }
  
  sendSubmit(){
    
    const message = {
      sender:this.userid,
      receiver:this.id,
      message:this.message
    }
    this.chatservice.createMessage(message).subscribe(res => {
      this.flashMessage.show(' Your message was sent, thank you! ' , {
        cssClass: 'alert-success',
        timeout:2000,
        
      })
      setInterval(this.missall, 2000)

     })
    
  }
  
}
