import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { FormsModule } from "@angular/forms";

import { RouterModule} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { Err404Component } from './common/err404/err404.component';

import { BackendComponent } from "./layout/backend/backend.component";
import { FrontendComponent } from "./layout/frontend/frontend.component";

import { SocialLoginModule,SocialAuthServiceConfig, FacebookLoginProvider } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

// Import library module
import { NgxSpinnerModule } from "ngx-spinner";

const CLIENT_ID = '437214085485-j1ho294f1m9sedlq624omgu8nlt9rjte.apps.googleusercontent.com';

const googleLoginOptions = {
  scope: 'profile email'
}; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig

// const fbLoginOptions = {
//   scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
//   return_scopes: true,
//   enable_profile_selector: true
// }; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    Err404Component,
    BackendComponent,
    FrontendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    SocialLoginModule,
    NgxSpinnerModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              CLIENT_ID,
              // googleLoginOptions
            )
          },
          // {
          //   id: FacebookLoginProvider.PROVIDER_ID,
          //   provider: new FacebookLoginProvider("Facebook-App-Id", fbLoginOptions)
          // }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
