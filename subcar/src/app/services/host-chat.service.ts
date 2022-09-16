import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostChatService {

  private subject = new Subject<Array<object>>();
  private _refreshNeeded$ = new Subject<void>();


  messageUrl:String = 'http://localhost:3000/chat/';
  usersURL:String= 'http://localhost:3000/users/';
  headers = { 'content-type': 'application/json' };

  key=localStorage.getItem('host')
  data = JSON.parse(this.key)
  id= this.data[Object.keys(this.data)[0]]

  constructor(private http:HttpClient) { }


  sendId(id){
    this.subject.next(id)
  }
  
  recivedId():Observable<Array<object>>{
  return this.subject.asObservable();
  }


  getAllMessagesForAHost(){
    return this.http.get(this.messageUrl + 'allmsg/'+`${this.id}`)
  }

  getallUsers(){
    return this.http.get(this.usersURL +'allusers');
  }

  getsendermessages(id){
   return this.http.get(this.messageUrl + 'getsendermsg/' + `${id}/` + `${this.id}`)
  }

  createMessage(message):Observable<any>{
    return this.http.post(this.messageUrl + 'msg', message).pipe(tap(() =>{
      this._refreshNeeded$.next();
    }));
    }

}
