import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserMapService {


  baseURL: string = 'http://localhost:3000/hosts/';

  constructor(private http:HttpClient) { }

getallhosts(){
  return this.http.get(this.baseURL +'allhosts')
}


private subject = new Subject<String>();

sendId(id){
  this.subject.next(id)
}

recivedId():Observable<String>{
return this.subject.asObservable();
}

}
