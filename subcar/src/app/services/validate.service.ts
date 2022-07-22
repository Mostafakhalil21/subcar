import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }


  validateRegister(user){
    if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined )
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  validateEmail(email){
    const emailReg =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;    
    return emailReg.test(email);

  }

}
