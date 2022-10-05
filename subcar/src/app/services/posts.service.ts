import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , Subject } from 'rxjs';
import { post } from '../models/posts.model';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PostsService {


  posts=[] ;
  key=localStorage.getItem('host')
  data = JSON.parse(this.key)
  id= this.data[Object.keys(this.data)[0]]
  name = this.data[Object.keys(this.data)[2]]
  businessImg = this.data[Object.keys(this.data)[4]]
  baseURL: string = 'http://localhost:3000/posts/';
  headers = { 'content-type': 'application/json' };
  constructor(private http:HttpClient) { }

  private _refreshNeeded$ = new Subject<void>();
  private subject = new Subject<String>();

  get refreshNeeded$(){
    return this._refreshNeeded$;
  }

  sendpost(post){
    this.subject.next(post)
  }
  
  recivedpost():Observable<String>{
  return this.subject.asObservable();
  }

  createPost(Post):Observable<any>{
   
    return this.http.post(this.baseURL + 'createpost' ,Post,{}).pipe(tap(() =>{
      this._refreshNeeded$.next();
    }));
  }
  


  getPosts():Observable<any>{
    return this.http.get('http://localhost:3000/posts/posts/'+`${this.id}`)
  }


  getFollowingPosts():Observable<any>{
    return this.http.get('http://localhost:3000/posts/posts/'+`${this.id}`)
  }

  getallPosts():Observable<any>{
    return this.http.get('http://localhost:3000/posts/get/posts')
  }

  getallcodes():Observable<any>{
    return this.http.get('http://localhost:3000/posts/get/code')
  }

  deletePost(id):Observable<any>{
      
      return this.http.delete(this.baseURL+'delete/'+`${id}/`+`${this.id}`)
  }

  editpost(id ,post):Observable<any>{
      return this.http.put(this.baseURL+'posts/'+`${id}`,post)
  }

  editPostImage(postId,postFormat){
    return this.http.put(this.baseURL+'postimage/'+`${postId}` ,postFormat)
  }

}
