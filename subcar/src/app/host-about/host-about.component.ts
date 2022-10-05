import { Component, OnInit } from '@angular/core';
import { NgbModal , ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HostRegisterComponent } from '../host-register/host-register.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-host-about',
  templateUrl: './host-about.component.html',
  styleUrls: ['./host-about.component.css']
})
export class HostAboutComponent implements OnInit {
  closeResult = '';
  constructor(private modealService:NgbModal,) { }

  ngOnInit(): void {
  }

  openHostRegister() {
    this.modealService.open(HostRegisterComponent, {size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openUserRegister() {
    this.modealService.open(RegisterComponent, {size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
    
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }
}
