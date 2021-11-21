import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/User';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Dating App';
  users: any;
  constructor(private http:HttpClient,private accountService: AccountService){}
  ngOnInit(){
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser(){
    const temp: string | null = localStorage.getItem('user');
    const user: User = JSON.parse(temp == null?'':temp);
    this.accountService.setCurrentuser(user);
  }
  
  getUsers(){
    this.http.get('https://localhost:5001/api/users').subscribe(response=>{
      this.users=response;
    }, error=>{
      console.log(error);
    })
  }
}