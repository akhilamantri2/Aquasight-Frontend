import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService, IAuth } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';
import { LocalStorageService } from '../../../../local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isloading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  ngOnInit(): any {
    this.auth(); //to check if user is logged in or not
  }

  auth() {
    if (this.localStorageService.getItem('userEmail')) {
      this.router.navigateByUrl('/form');
    }
  }

  onLoad(myfunc: any) {
    setTimeout(() => {
      this.isloading = false;
      if (myfunc) {
        myfunc();
      }
    }, 2000);
  }

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  onSubmit() {
    this.isloading = true;
    this.authService
      .login(this.loginForm.value.username!, this.loginForm.value.password!)
      .subscribe({
        next: (response) => {
          console.log(response, 'akkiresp');
          this.localStorageService.setItem('userEmail', response.data);
          this.onLoad(() => this.router.navigateByUrl('/form'));
        },
        error: (e) => {
          console.log(e);
          this.onLoad(() => (this.errorMessage = e.error.error));
        },
        complete: () => {
          this.onLoad(null);
          console.info('complete');
        },
      });
  }
}
