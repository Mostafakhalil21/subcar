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
import { TestComponent } from './test/test.component';
import { EditHostProfileComponent } from './edit-host-profile/edit-host-profile.component';
import { MoreprofiledetailsComponent } from './moreprofiledetails/moreprofiledetails.component';
import { PostPopUpComponent } from './post-pop-up/post-pop-up.component';
import { MapComponent } from './map/map.component';
import { HostMapComponent } from './host-map/host-map.component';
import { Test2Component } from './test2/test2.component';
import { ChatComponent } from './chat/chat.component';
import { HostChatComponent } from './host-chat/host-chat.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { AboutComponent } from './about/about.component';
import { UserMapComponent } from './user-map/user-map.component';

const routes: Routes = [
  { path:'',pathMatch:'full',redirectTo:'about'},
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
  { path:'businessprofile', component:BusinessProfileComponent,canActivate:[HostAuthGuard]},
  { path:'test', component:TestComponent},
  {path:'edithostprofile' , component:EditHostProfileComponent,canActivate:[HostAuthGuard]},
  {path:'moreprofiledetails/:_id' , component:MoreprofiledetailsComponent},
  {path:'postpopup' , component:PostPopUpComponent,canActivate:[HostAuthGuard]},
  {path:'map' , component:MapComponent},
  {path:'hostmap' , component:HostMapComponent},
  {path:'about' , component:AboutComponent},
  {path:'chat' , component:ChatComponent},
  {path:'hostchat' , component:HostChatComponent},
  {path:'userchat' , component:UserChatComponent},
  {path:'usermap' , component:UserMapComponent},









];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
