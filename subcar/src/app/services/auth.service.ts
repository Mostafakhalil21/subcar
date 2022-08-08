import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken :any ;
  user:any;

  baseURL: string = 'http://localhost:3000/users/';
  headers = { 'content-type': 'application/json' };
  helper = new JwtHelperService();
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$(){
    return this._refreshNeeded$;
  }

  
  constructor(private http:HttpClient) { }

  registerUser(user):Observable<any>{
     
      return this.http.post(this.baseURL + 'register' , user , {
        headers:this.headers
      })
    }


    authenticateUser(user):Observable<any>{
      return this.http.post(this.baseURL + 'authenticate' , user , {
        headers:this.headers
    }).pipe(tap(()=>{
      this._refreshNeeded$.next();
    }));
  }
  getProfile() :Observable<any>{
    const token = localStorage.getItem('id_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    }
    return this.http.get('http://localhost:3000/users/profile', httpOptions)
      .pipe(
        map(res => res)
      
    )}
  



  storeUserData(token , user){
    localStorage.setItem('id_token' , token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user ;

  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken=token;
  }

logout(){
  this.authToken = null ;
  this.user = null ;
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

