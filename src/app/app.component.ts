import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/views/login/login.component';
import { StorageModule } from '@ngx-pwa/local-storage';
import { LocalStorageService } from '../local-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  userName: any = '';

  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) {}
  ngOnInit() {
    this.userName = this.localStorage.getItem('userEmail');
  }
  logout() {
    this.localStorage.clear();
    window.location.reload();
    this.router.navigateByUrl('/');
  }
  title = 'aquasight-frontend';
}
