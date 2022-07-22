import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:String;
  password:String;

  constructor(
    private authServer:AuthService, 
    private router:Router,
    private flashMessage:FlashMessagesService,
    ) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
  
    const user = {
      username :this.username,
      password:this.password
    }

    this.authServer.authenticateUser(user).subscribe(data =>{
      if(data.success)
      {
        this.authServer.storeUserData(data.token , data.user);
        this.flashMessage.show('You are now logged in' , {
          cssClass: 'alert-success',
          timeout:5000
        });
        this.router.navigate(['home'])
      }
      else
      {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger' , timeout:5000});  
        this.router.navigate[('login')]
      }
    })

  }
}
