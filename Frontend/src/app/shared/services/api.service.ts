import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postRestaurent(data: any){
    return this.http.post("http://localhost:5000/api/restaurants/", data).pipe(
      map((res:any) => {
        return res;
      }))
  }

  getRestaurent(){
    return this.http.get("http://localhost:5000/api/restaurants/").pipe(
      map((res:any) => {
        return res;
      }))
  }

  updateRestaurent(data:any, id:number){
    return this.http.put("http://localhost:5000/api/restaurants/"+id, data).pipe(
      map((res:any) => {
        return res;
      }))
  }

  deleteRestaurent(id: number){
    return this.http.delete("http://localhost:5000/api/restaurants/"+id).pipe(
      map((res:any) => {
        return res;
      }))
  }

  getLoggedInUser(){
    const token = localStorage.getItem('access_token')
    const headers = { 'Authorization': `Bearer ${token}`, 'My-Custom-Header': 'foobar' }
    return this.http.get("http://localhost:5000/api/users/me",  { headers }).pipe(
      map((res:any) => {
        return res;
      }))
  }

}
