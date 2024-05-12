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
import { DataService } from '../../../services/data.service';
import { LoaderComponent } from '../loader/loader.component';
import { LocalStorageService } from '../../../../local-storage.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoaderComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  isloading: boolean = false;
  errorMessage: string = '';
  dataForm = new FormGroup({
    flow: new FormControl(1, [Validators.required, Validators.min(1)]),
    pressure: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  ngOnInit(): any {
    if (!localStorage.getItem('testSession')) {
      localStorage.setItem('testSession', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('testSession');
    }
    this.onLoad(null);
    this.auth();
  }

  onLoad(myfunc: any) {
    setTimeout(() => {
      this.isloading = false;
      if (myfunc) {
        myfunc();
      }
    }, 2000);
  }
  auth() {
    if (!this.localStorage.getItem('userEmail')) {
      this.router.navigateByUrl('');
    }
  }

  constructor(
    private dataService: DataService,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}
  onSubmit() {
    this.isloading = true;
    this.dataService
      .addData(this.dataForm.value.flow!, this.dataForm.value.pressure!)
      .subscribe({
        next: (token) => {
          console.log(token);
        },
        error: (e) => {
          this.onLoad(() => (this.errorMessage = e.error.error));
          console.log(e);
        },
        complete: () => {
          this.onLoad(null);
          console.info('complete adding the data');
        },
      });
  }
  onView() {
    this.isloading = true;
    this.onLoad(() => this.router.navigateByUrl('/datadisplay'));
  }
}
