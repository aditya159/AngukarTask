import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UserService}from '../app/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularTask';
  loginForm: FormGroup;
  signUpForm: FormGroup;
  isSignUp:boolean=true;
  constructor(
    private _FormBuilder: FormBuilder,
    private _UserService:UserService,
    private _Router:Router
  ) {
    this.signUpForm = this._FormBuilder.group({
      userName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

    this.loginForm=this._FormBuilder.group({
      userNameorEmail:[null,[Validators.required]],
      password:[null,[Validators.required]]
    })
  }

  ngOnInit() {

  }

  changeView(mode){
    //login
    if(mode ==0){
      this.isSignUp=false;
    }
    if(mode == 1){
      this.isSignUp=true;
    }
  }

  signUpUser(){
    if(this.signUpForm.valid){
      this._UserService.register(this.signUpForm.value).then(res=>{
        if(res.success){
          alert("Registration Success ");
        }
        else{
          alert("data not Added");
        }
      })
    }
  }

  loginUser(){
    if(this.loginForm.valid){
      this._UserService.login(this.loginForm.value).then(res=>{
        if(res.success){
          localStorage.setItem('token',res.token);
          alert("login success");
          this._Router.navigate(['/dashboard']);
        }
        else{
          alert("invalid credintals");
        }
      })
    }
  }

}
