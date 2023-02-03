import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
public loginform!: FormGroup

constructor(private formbuilder:FormBuilder,private http:HttpClient,private router:Router){}

  login(){
    this.http.get<any>("http://localhost:3000/superadmin" && "http://localhost:3000/adminlogin").subscribe(res=>{
      const user =res.find((a:any)=>{
        return a.email === this.loginform.value.email && a.password === this.loginform.value.password
      });
      if(user){
        alert("loginsuccesfull");
        this.loginform.reset()
        this.router.navigate(["UsermainComponent"])
      }
      else{
        alert("user not found")
        this.router.navigate(["login"])
      }
      (error:any)=>{
        alert("something went wrong")
      }
    })
  }

  close(){
           this.router.navigate(["login"])
  }

  get Email(): FormControl {
     return this.loginform.get("email")as FormControl;
   }

   get Password(): FormControl {
     return this.loginform.get("password")as FormControl;
   } 

  ngOnInit(): void {
    this.loginform=this.formbuilder.group({
      email:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",[Validators.required,Validators.maxLength(15),Validators.minLength(6)])
            
  
    })
  }    

 
}


