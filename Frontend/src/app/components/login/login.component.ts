import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email ],
      password: ['', Validators.required]
    })
  }

  login(){

    this.submitted = true;
        // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.http.post<any>('http://localhost:5000/api/users/login', this.loginForm.value).subscribe(res => {
      // console.log(res);
      localStorage.setItem('access_token', res.token);  // storing token to localStorage

      if(res.email === this.loginForm.value.email){
        // alert("Login Successfull!");
        this.toast.success({detail: "Success Message", summary: `Login Successfull!`, duration: 2000});
        this.loginForm.reset();
        this.router.navigate(['restaurent']);
      }
    },
    err => {
        // alert("User Not Found!!");
         this.toast.error({detail: "Error Message", summary: "Invalid Credentials!", duration: 2000});
         this.submitted = false;
    })
  }

}




    // const user = res.find((data: any) => {
      //   // console.log(data);
      //   return data.email === this.loginForm.value.email && data.password === this.loginForm.value.password;
      // })

      // console.log(res)

    //   if(res.email === this.loginForm.value.email){
    //     // alert("Login Successfull!");
    //     this.toast.success({detail: "Success Message", summary: `Login Successfull!`, duration: 2000});
    //     this.loginForm.reset();
    //     this.router.navigate(['restaurent']);
    //   }
    //   else{
    //     // alert("User Not Found!!");
    //     this.toast.error({detail: "Error Message", summary: "User Not Found!", duration: 2000});
    //   }
    // },
    // err => {
    //   // alert("Something went wrong!!")
    //   this.toast.warning({detail: "Warning", summary: `Something went wrong!`, duration: 3000});
