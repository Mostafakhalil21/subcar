import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditUserProfileService {
  USERURL: string = 'http://localhost:3000/users/';


  get refreshNeeded$(){
    return this._refreshNeeded$;
  }
  private subject = new Subject<String>();
  private _refreshNeeded$ = new Subject<void>();
  
  key =  localStorage.getItem("user")
  data = JSON.parse(this.key)
  id= this.data[Object.keys(this.data)[0]]

  constructor(private http:HttpClient) { }

  updateUser(formdata):Observable<any>{
    return this.http.put(this.USERURL+`${this.id}`,formdata,{}).pipe(tap(() =>{
      this._refreshNeeded$.next();
    }));
  }

  getUserProfile(){
    return this.http.get(this.USERURL+'getuser/'+`${this.id}`);
  }


}
