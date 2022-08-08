import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:object;

  constructor(
    private authservice:AuthService,
    private route:Router,

  ) { }

  ngOnInit(): void {
    this.authservice.getProfile().subscribe(profile =>{
      this.user = profile.user;
      console.log(profile.user)
     
    } , 
    
    err =>{
      console.log(err);
      return false;
    })

   
  }

}
