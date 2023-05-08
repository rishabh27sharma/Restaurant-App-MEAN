import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private router:Router, private toast: NgToastService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      _id: [''],
      name: ['',  Validators.required],
      email: ['', Validators.required, Validators.email],
      mobile: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  signUp(){

    this.submitted = true;
        // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    this.http.post<any>('http://localhost:5000/api/users', this.signupForm.value).subscribe(res => {
      // alert("Registration Successfull!");
      // console.log(res);
      localStorage.setItem('access_token', res.token);

      this.toast.success({detail: "Success Message", summary: `Registration Successfull!`, duration: 2000});
      this.signupForm.reset();
      this.router.navigate(['login']);
    },
    err => {
      // alert("OOPs, Something went wrong!")
      this.toast.error({detail: "Error Message", summary: "OOPs, Something went wrong!", duration: 2000})
    }
    )
  }

}
