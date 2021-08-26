import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
   userObj
  constructor(private hc:HttpClient) { }
  
  ngOnInit(): void {
    //get user data from local storage
   this.userObj=JSON.parse(localStorage.getItem("userobj"))
  }
getprivatedata()
{
  this.hc.get("/user/dummyroute").subscribe(
    res=>{
      alert(res["message"])
    },
    err=>{
      console.log(err)
      alert(err.message)
    }
  )
}
}
