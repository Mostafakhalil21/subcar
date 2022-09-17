import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostRegisterService {
  baseURL: string = 'http://localhost:3000/hosts/';

  constructor(private http:HttpClient) { }


  registerHost(host):Observable<any>{
     
    return this.http.post(this.baseURL + 'register' , host , {
    })
  }

}
