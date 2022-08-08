import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { HostRegisterComponent } from './host-register/host-register.component';
import { HostDashboardComponent } from './host-dashboard/host-dashboard.component';
import { HostLoginComponent } from './host-login/host-login.component';
import { HostProfileComponent } from './host-profile/host-profile.component';
import { HostAuthGuard } from './guards/hostAuth.guard';
import { HostnavbarComponent } from './hostnavbar/hostnavbar.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';

const routes: Routes = [
  { path:'',pathMatch:'full',redirectTo:'login'},
  { path:'login', component:LoginComponent},
  { path:'register', component:RegisterComponent},
  { path:'home', component:HomeComponent,canActivate:[AuthGuard] },
  { path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  { path:'profile', component:ProfileComponent , canActivate:[AuthGuard]},
  { path:'navbar', component:NavbarComponent},
  { path:'hostnavbar', component:HostnavbarComponent},
  { path:'hostregister', component:HostRegisterComponent },
  { path:'hostdashboard', component:HostDashboardComponent,canActivate:[HostAuthGuard]},
  { path:'hostlogin', component:HostLoginComponent},
  { path:'hostprofile', component:HostProfileComponent ,canActivate:[HostAuthGuard]},
  { path:'businessprofile', component:BusinessProfileComponent ,canActivate:[HostAuthGuard]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
