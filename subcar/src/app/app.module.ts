import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidateService } from './services/validate.service';
import { FlashMessagesModule } from 'flash-messages-angular';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from './guards/auth.guard';
import { HostLoginComponent } from './host-login/host-login.component';
import { HostRegisterComponent } from './host-register/host-register.component';
import { HostProfileComponent } from './host-profile/host-profile.component';
import { HostAuthGuard } from './guards/hostAuth.guard';
import { HostnavbarComponent } from './hostnavbar/hostnavbar.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MoreprofiledetailsComponent } from './moreprofiledetails/moreprofiledetails.component';
import { HostAuthService } from './services/host-auth.service';
import { PostsService } from './services/posts.service';
import { UserpostsService } from './services/userposts.service';
import { EditHostProfileComponent } from './edit-host-profile/edit-host-profile.component';
import { PostPopUpComponent } from './post-pop-up/post-pop-up.component';
import { MapComponent } from './map/map.component';
import { HostMapComponent } from './host-map/host-map.component';
import { ChatComponent } from './chat/chat.component';
import { HostChatComponent } from './host-chat/host-chat.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { UserMapComponent } from './user-map/user-map.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { NgImageSliderModule } from 'ng-image-slider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { InterceptorService } from './loader/interceptor.service';
import {MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { TestComponent } from './test/test.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { EditPostImgComponent } from './edit-post-img/edit-post-img.component';
import { HostAboutComponent } from './host-about/host-about.component';
import { HostFooterComponent } from './host-footer/host-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HostLoginComponent,
    HostRegisterComponent,
    HostProfileComponent,
    HostnavbarComponent,
    BusinessProfileComponent,
    MoreprofiledetailsComponent,
    EditHostProfileComponent,
    PostPopUpComponent,
    MapComponent,
    HostMapComponent,
    ChatComponent,
    HostChatComponent,
    UserChatComponent,
    FooterComponent,
    AboutComponent,
    UserMapComponent,
    SearchFilterPipe,
    EditUserProfileComponent,
    TestComponent,
    PostDetailsComponent,
    EditPostComponent,
    EditPostImgComponent,
    HostAboutComponent,
    HostFooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    FlashMessagesModule.forRoot(),
    ReactiveFormsModule,
    NgImageSliderModule,
    MatProgressBarModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatIconModule
    

   
    
    
  ],
  providers: [ValidateService , AuthService , AuthGuard , HostAuthGuard ,HostAuthService, HostAuthService ,UserpostsService  , PostsService ,
  {provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
