
import { HttpClient } from '@angular/common/http';
import { Observable , Subject } from 'rxjs';
import { host } from '../models/host.model';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserpostsService {

  posts=[] ;
  key=localStorage.getItem('user')
  data = JSON.parse(this.key)
  id= this.data[Object.keys(this.data)[0]]
  baseURL: string = 'http://localhost:3000/posts/';
  baseurll:String = 'http://localhost:3000/posts/timeline/';
  anotherbaseurl:String ='http://localhost:3000/hosts/allHosts/';
  followUrl:String = 'http://localhost:3000/hosts/follow/';
  followrUrl:string = 'http://localhost:3000/hosts/getfollowerhost/';
  headers = { 'content-type': 'application/json' };

  constructor(private http:HttpClient) { }
  private _refreshNeeded$ = new Subject<void>();
  private subject = new Subject<String>();

  get refreshNeeded$(){
    return this._refreshNeeded$;
  }


  getFollowingPosts():Observable<any>{
    return this.http.get(this.baseurll+`${this.id}`)
  }


  getAllHosts():Observable<any>{
    return this.http.get(this.anotherbaseurl+`${this.id}`)
  }

  
  getfollowerHosts():Observable<any>{
    return this.http.get(this.followrUrl+`${this.id}`)
  }

  followHost(hostId):Observable<any>{
    let body = JSON.stringify(new host(this.id))
    return this.http.put('http://localhost:3000/users/follow/'+ `${hostId}` ,body,{
      headers:this.headers}).pipe(tap(() =>{
        this._refreshNeeded$.next();
      }));
  
  }

  UnfollowHost(hostId):Observable<any>{
    let body = JSON.stringify(new host(this.id))
    return this.http.put('http://localhost:3000/users/unfollow/'+ `${hostId}` ,body,{
      headers:this.headers}).pipe(tap(() =>{
        this._refreshNeeded$.next();
      }));
  
  }
  //like / dislike a post
  likePost(postId):Observable<any>{
    let body = JSON.stringify(new host(this.id))
    return this.http.put('http://localhost:3000/posts/like/'+ `${postId}` ,body,{
      headers:this.headers}).pipe(tap(() =>{
        this._refreshNeeded$.next();
      }));
  }

  mostliked(){
    return this.http.get(this.baseURL+'most/'+'liked')
  }
  sendpost(postId){
    this.subject.next(postId)
  }
  
  recivedpost():Observable<String>{
  return this.subject.asObservable();
  }

  getallPosts():Observable<any>{
    return this.http.get('http://localhost:3000/posts/get/posts')
  }


  allhosts(){
 return this.http.get('http://localhost:3000/hosts/allhosts')
  }
}

 
