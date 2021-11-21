import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import {map} from 'rxJs/operators';
import { map} from 'rxjs/operators';
import { User } from '../_models/User';

import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/'
  private currentUserSource = new ReplaySubject<User>(1);
  currentuser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) {
   }
   
   login(model:any){
    return this.http.post<User>(this.baseUrl + 'account/login',model).pipe(
      map((response:User)=>{
        const user = response;
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  setCurrentuser(user: User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');

    this.currentUserSource.next(undefined);
  }
}
