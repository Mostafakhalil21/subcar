import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditHostProfileService {
  hostURL: string = 'http://localhost:3000/hosts/';

  private subject = new Subject<String>();
  private _refreshNeeded$ = new Subject<void>();

  key =  localStorage.getItem("host")
  data = JSON.parse(this.key)
  id= this.data[Object.keys(this.data)[0]]
  name = this.data[Object.keys(this.data)[2]]

  get refreshNeeded$(){
    return this._refreshNeeded$;
  }
  
  constructor(private http:HttpClient) { }
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


    updateHost(formdata):Observable<any>{
      return this.http.put(this.hostURL+`${this.id}`,formdata,{}).pipe(tap(() =>{
        this._refreshNeeded$.next();
      }));
    }

    getallhosts():Observable<any>{
      return this.http.get(this.hostURL + 'allhosts')
    }
  
    getallPosts():Observable<any>{
      return this.http.get('http://localhost:3000/posts/get/posts')
    }
    
    sendId(id){
      this.subject.next(id)
    }
    
    recivedId():Observable<String>{
    return this.subject.asObservable();
    }

}
