import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserMapService {


  baseURL: string = 'http://localhost:3000/hosts/';

  constructor(private http:HttpClient) { }

getallhosts(){
  return this.http.get(this.baseURL +'allhosts')
}

}
