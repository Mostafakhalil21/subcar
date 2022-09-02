import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  hostURL: string = 'http://localhost:3000/hosts/';
  private subject = new Subject<String>();

  constructor(private http:HttpClient) { }

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
