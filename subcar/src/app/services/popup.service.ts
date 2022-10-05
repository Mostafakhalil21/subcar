import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  key =  localStorage.getItem("user")
  data = JSON.parse(this.key)
  hostURL: string = 'http://localhost:3000/hosts/';
  id= this.data[Object.keys(this.data)[0]]

  
  private subject = new Subject<String>();
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$(){
    return this._refreshNeeded$;
  }

  constructor(private http:HttpClient ) { }

  getallhosts():Observable<any>{
    return this.http.get(this.hostURL + 'allhosts').pipe(tap(() =>{
      this._refreshNeeded$.next();
    }));
  }

  getallPosts():Observable<any>{
    return this.http.get('http://localhost:3000/posts/get/posts').pipe(tap(() =>{
      this._refreshNeeded$.next();
    }));
  }
  
  sendId(id){
    this.subject.next(id)
  }
  
  recivedId():Observable<String>{
  return this.subject.asObservable();
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


    getuser(){
      return this.http.get("http://localhost:3000/users/getuser/"+`${this.id}`).pipe(tap(() =>{
        this._refreshNeeded$.next();
      }));
    }

}
