import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(private us:UserService,private router:Router){}

  onLogin(credentials)
  {
      
      this.us.loginUser(credentials).subscribe(
        res=>{
          if(res.message==="login success")
          {
            //save token to local storage
            localStorage.setItem("token",res.token);
            localStorage.setItem("username",res.username)
            localStorage.setItem("userobj",JSON.stringify(res.userobj))
            //navigate to user profile
            this.router.navigateByUrl(`userprofile/${res.username}`)

            this.us.userLoginStatus=true

          }
          else{
            alert(res.message)
          }
        },
        err=>{
          console.log(err)
          alert("something went wrong in login")
        }
      )
    
  
    
  }
  
  
}
