import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private subject = new Subject<String>();
  private _refreshNeeded$ = new Subject<void>();

  constructor(private http:HttpClient) { }

  key =  localStorage.getItem("user")
  data = JSON.parse(this.key)
  id= this.data[Object.keys(this.data)[0]]

messageUrl:String = 'http://localhost:3000/chat/';
  sendId(id){
    this.subject.next(id)
  }
  
  recivedId():Observable<String>{
  return this.subject.asObservable();
  }

createMessage(message):Observable<any>{
return this.http.post(this.messageUrl + 'msg', message).pipe(tap(() =>{
  this._refreshNeeded$.next();
}));
}

getAllMessagesForAHost(){
  return this.http.get(this.messageUrl + 'allmsg')
}

}
