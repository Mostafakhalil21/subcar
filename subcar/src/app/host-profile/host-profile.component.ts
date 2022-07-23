import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HostAuthService } from '../services/host-auth.service';

@Component({
  selector: 'app-host-profile',
  templateUrl: './host-profile.component.html',
  styleUrls: ['./host-profile.component.css']
})
export class HostProfileComponent implements OnInit {
  host:object;
  constructor(
    private hostAuth:HostAuthService,
    private route:Router,
  ) { }

  ngOnInit(): void {

    this.hostAuth.getProfile().subscribe(profile =>{
      this.host=profile.user;
      console.log(profile.user)
    },
    err =>{
      console.log(err);
      return false;
    })
  }

}
