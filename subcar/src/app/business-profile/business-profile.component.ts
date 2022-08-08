import { Component, OnInit } from '@angular/core';
import { HostAuthService } from '../services/host-auth.service';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent implements OnInit {
  hosts:object;
  constructor(
    private hostAuth:HostAuthService
  ) { }

  ngOnInit(): void {
    // this.gethostdetails();  <- i will fix this after sharam
    console.log(this.hosts)
  }


  // gethostdetails(){
  //   this.hostAuth.sendhostdetails().subscribe((data) => {
  //     this.hosts=data;
  //   })
  // }

}
