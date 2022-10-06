import { Component, Output ,Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { LogService } from '../../services/log.service';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {

  ionicForm!: FormGroup;
  isSubmitted = false;
  user:any[];
  claims: any;
  dataShared: any;
  constructor(public formBuilder: FormBuilder,
     private router: Router,
     private data: DataService,
     private logService: LogService,
     private activatedRoute: ActivatedRoute,
     public auth: AuthService,
     ) {
      this.user = JSON.parse(localStorage.getItem('currentUser') || '[]');

     }

  ngOnInit(): void {
    console.log(this.user,'log page')
    if (this.user.length!==0) {
      this.router.navigate(['/']);
   }
    this.ionicForm = this.formBuilder.group({
      login: ['', [Validators.required]], 
      password: ['', [Validators.required]],
    })

    
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm() {
    console.log(this.ionicForm.value)
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
    } else {
      this.logService.authData(this.ionicForm.value.login, this.ionicForm.value.password).subscribe(
        (resp) => {
        this.user = resp;console.log(this.user);
        this.data.setData(this.user);
        localStorage.setItem('currentUser', JSON.stringify(resp));
        this.router.navigate(['/']);
        window.location.reload()
        });
    }
      
  }

  openWebsite() {
    window.open(`https://www.betaseries.com/authorize?client_id=bae9b5613db8&redirect_uri=${window.location.origin}/login`, '_blank');
    let code= this.activatedRoute.snapshot.paramMap.get('code')|| '';
    console.log(code);
    this.logService.login(code).subscribe(
      (resp) => {
      console.log(resp);
  
        });
  }

  login(): void {
    this.auth.loginWithRedirect();
    let code= this.activatedRoute.snapshot.paramMap.get('code')|| '';
    console.log(code);
    this.logService.login(code).subscribe(
      (resp) => {
      console.log(resp);
  
        });
  }
  switch(){
    this.dataShared = this.data.getData();
  }
  logout():void{
    this.data.setData(null);
    this.dataShared = null;
     console.log(this.dataShared)
    localStorage.removeItem('currentUser');
    this.router.navigate(['tabs/home'])
  }

}