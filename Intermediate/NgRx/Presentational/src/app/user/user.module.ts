import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login.component';
import { userReducer } from './state/user.reducer';
import { StoreModule } from '@ngrx/store';

const userRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    StoreModule.forFeature("users", userReducer),
    SharedModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [
    LoginComponent
  ]
})
export class UserModule { }
