import { Routes } from '@angular/router';
import { DatadisplayComponent } from './components/views/datadisplay/datadisplay.component';
import { FormComponent } from './components/views/form/form.component';
import { LoginComponent } from './components/views/login/login.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'form', component: FormComponent},
    {path: 'datadisplay', component: DatadisplayComponent},
];
