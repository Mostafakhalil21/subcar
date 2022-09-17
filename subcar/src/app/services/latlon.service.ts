import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LatlonService {
  baseURL: string = 'http://localhost:3000/hosts/';
  key=localStorage.getItem('host')
  data = JSON.parse(this.key)
  hostid= this.data[Object.keys(this.data)[0]]
  constructor(private http:HttpClient) { }

  updatelatlon(latlon){
    return this.http.put(this.baseURL+'updatelatlon/' +`${this.hostid}`,latlon)
  }
}
