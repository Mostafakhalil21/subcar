import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class HostAuthService {

  authToken :any ;
  host:any;


  baseURL: string = 'http://localhost:3000/hosts/';
  headers = { 'content-type': 'application/json' };
  helper = new JwtHelperService();

  
  constructor(private http:HttpClient) { }


  registerHost(host):Observable<any>{
     
    return this.http.post(this.baseURL + 'register' , host , {
      headers:this.headers
    })
  }


  authenticateHost(host):Observable<any>{
    return this.http.post(this.baseURL + 'authenticate' , host , {
      headers:this.headers
  })
}


getProfile() :Observable<any>{
  const token = localStorage.getItem('id_token');
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
  }
  return this.http.get('http://localhost:3000/hosts/hostprofile', httpOptions)
    .pipe(
      map(res => res)
    
  )}


  storeHostData(token , host){
    localStorage.setItem('id_token' , token);
    localStorage.setItem('host',JSON.stringify(host));
    this.authToken = token;
    this.host = host ;

  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken=token;
  }

  logout(){
    this.authToken = null ;
    this.host = null ;
    localStorage.clear();
  }

  //a function to check if we are logged in for the navbar navigation
loggedIn(){
  const token = localStorage.getItem('id_token')
  return this.helper.isTokenExpired(token)
}


loggedInn(){
  return !!localStorage.getItem('id_token')
 }

}
