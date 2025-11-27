import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EventEmitter } from 'stream';
import { ConnectionService } from './service/connection.service';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  conct!: boolean
  registe2: boolean = false
  registe: boolean = false
  loginError: boolean = false
  email: boolean = false
  code: boolean = false
  password: boolean = false
  close: boolean = true
  login: boolean = true
  f1: boolean = false
  f2: boolean = false
  f3: boolean = false
  id: any;
  otp!: boolean | false
  num!: boolean | false

  form = this.fb.group({
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
    otp: ['', Validators.required],
  });




  loginForm: FormGroup;
  registerForm: FormGroup;
  forgForm1: FormGroup
  forgForm2: FormGroup
  forgForm3: FormGroup

  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private fb: FormBuilder, private http: HttpClient, private route: Router, private conctService: ConnectionService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.registerForm = this.fb.group({

      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
    this.forgForm1 = this.fb.group({

      email: ['', [Validators.required]],

    });
    this.forgForm2 = this.fb.group({

      code: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
    this.forgForm3 = this.fb.group({

      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });



    this.forgForm3 = this.fb.group({

      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    console.log(this.conctService.getAuth())
    this.conct = this.conctService.getAuth()
  }

  onLogin() {

    if (this.loginForm.valid) {
      this.http.post<any>(`${this.baseUrl}/signin`, this.loginForm.value).subscribe(response => {
        console.log('Login successful', response);


        this.conctService.SetAuth("true")

        this.conctService.SetUserAuth(response.id)
        console.log(this.conctService.getUserAuth())

        this.conct = true

        $('#exampleModalCenter').modal('hide');


        // Handle successful login
      }, error => {
        console.error('Login failed', error);
        this.loginError = true;
        // Handle login error
      });
    }
  }

  onRegister() {

    if (this.registerForm.valid && this.registerForm.value.password === this.registerForm.value.confirmPassword) {
      this.http.post<any>(`${this.baseUrl}/signup`, this.registerForm.value).subscribe(response => {

        console.log('Registration successful', response);
        this.registe = false
        this.registe2 = false

        $('#exampleModalCenter').modal('hide');

        // Handle successful registration
      }, error => {
        console.error('Registration failed', error);
        this.registe2 = true
        // Handle registration error
      });
    } else {
      this.registe = true
      console.error('Form is invalid or passwords do not match');
    }
  }
  onForg1() {
    console.log(this.forgForm1.value.email);

    localStorage.setItem("email", this.forgForm1.value.email);

    this.http.post("http://localhost:8080/api/auth/Forget", this.forgForm1.value).subscribe({
      next: data => {
        this.f1 = false;
        this.f2 = true;
      },
      error: error => {
        this.email = true;
      }
    });
  }
  onForg2() {
    this.http.get<any>(this.baseUrl + '/code' + "/" + this.forgForm1.value.email).subscribe({
      next: (data: any) => {
        this.id = data.id;
        console.log('Entered Code:', this.forgForm2.value.code);
        console.log('Retrieved Code:', data.code);
        if (this.forgForm2.value.code == data.code) {
          this.http.delete(this.baseUrl + '/code' + "/" + this.id).subscribe({
            next: (data: any) => {
              console.log('Code deleted:', data);
            },
            error: (error: any) => {
              console.error('Error deleting code:', error);
            }
          });
          this.f2 = false;
          this.f3 = true;
        } else {
          this.code = true;
        }
      },
      error: (error: any) => {
        console.error('Error retrieving code:', error);
        this.code = true;
      }
    });
  }



  onForg3() {




    if (this.forgForm3.value.password == this.forgForm3.value.confirmPassword) {
      this.http.post(this.baseUrl + '/rest_password', { email: this.forgForm1.value.email, password: this.forgForm3.value.password, }).subscribe({
        next: data => {
          console.log("ok")





        }
      })








    }
    else {
      this.password = true
    }
  }
  loginclen() {

    console.log("login1")
    this.login = true
    this.f1 = false
    this.f2 = false
    this.f3 = false

  }
  forget() {
    this.login = false
    this.f1 = true

  }
  register() {


  }
  login2() {
    console.log("login2")


    this.login = true
    this.f1 = false
    this.f2 = false
    this.f3 = false
  }
  logout() {
    this.conctService.SetAuth("false")
    this.conct = false
    this.f1 = false
    this.f2 = false
    this.f3 = false
    this.login = true

    this.route.navigate(["/"])




  }
}