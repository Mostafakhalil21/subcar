import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hostnavbar',
  templateUrl: './hostnavbar.component.html',
  styleUrls: ['./hostnavbar.component.css']
})
export class HostnavbarComponent implements OnInit {

  constructor(
    public authservice:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService  
  ) { }

  ngOnInit(): void {
    console.log(this.authservice.loggedIn())
  }


  onLogoutClick(){
    this.authservice.logout();
    this.flashMessage.show('You are logged out' , {
      cssClass:'alert-success',
      timeout:3000
    });
    this.router.navigate(['/hostlogin']);
    return false;
}
}
