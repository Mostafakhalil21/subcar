import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { HostAuthService } from '../services/host-auth.service';
@Component({
  selector: 'app-host-login',
  templateUrl: './host-login.component.html',
  styleUrls: ['./host-login.component.css']
})
export class HostLoginComponent implements OnInit {
  businessName:String;
  password:String;

  constructor(
    private hostAuth:HostAuthService, 
    private router:Router,
    private flashMessage:FlashMessagesService,

  ) { }

  ngOnInit(): void {
  }


  onLoginSubmit(){
  
    const host = {
      businessName :this.businessName,
      password:this.password
    }

    this.hostAuth.authenticateHost(host).subscribe(data =>{
      if(data.success)
      {
        this.hostAuth.storeHostData(data.token , data.host);
        this.flashMessage.show('You are now logged in' , {
          cssClass: 'alert-success',
          timeout:5000
        });
        this.router.navigate(['hostdashboard'])
      }
      else
      {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger' , timeout:5000});  
        this.router.navigate[('hostlogin')]
      }
    })

  }

}
