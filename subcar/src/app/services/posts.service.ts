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

  get refreshNeeded$(){
    return this._refreshNeeded$;
  }

  

  createPost(Post:post):Observable<any>{
    let body = JSON.stringify(new post(this.name,this.businessImg,this.id,Post.img,Post.desc,Post.cartype,Post.kms,Post.ownersnumber,Post.carcolor,Post.caryear))
    return this.http.post(this.baseURL + 'createpost' ,body,{
      headers:this.headers
    }).pipe(tap(() =>{
      this._refreshNeeded$.next();
    }));
  }


  getPosts():Observable<any>{
    return this.http.get('http://localhost:3000/posts/posts/'+`${this.id}`)
  }


  getFollowingPosts():Observable<any>{
    return this.http.get('http://localhost:3000/posts/posts/'+`${this.id}`)
  }

}
