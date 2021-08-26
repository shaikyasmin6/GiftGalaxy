import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import {UserService} from '../user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  constructor(private us:UserService,private router:Router){  }

  file:File


  selectFile(event)
  {
    this.file=event.target.files[0]
    
  }

  onSignUp(userobj)
  {
    let formData=new FormData();
    //add file
    formData.append("photo",this.file,this.file.name)
    formData.append("userobj",JSON.stringify(userobj))
      this.us.createUser(formData).subscribe(
        res=>{
          if(res.message==="user created")
          {
              alert("User Created Successfully")
              //navigate to login component
              this.router.navigateByUrl("/login")
          }
          else
          {
            alert(res.message)
          }
        },
        err=>{
          console.log(err)
          alert("something went wrong")
        }
      )
      
  }


 


  
}
