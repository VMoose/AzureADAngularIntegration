import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { MsalModule, MsalInterceptor, MsalGuard } from "@azure/msal-angular";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/common/header/header.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { RouterModule } from "@angular/router";
import { ProfileComponent } from "./components/profile/profile.component";

const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "/app", pathMatch: "full" },
      {
        path: "app",
        component: AppComponent,
        children: [{ path: "", redirectTo: "app", pathMatch: "full" }],
      },
    ]),
    MsalModule.forRoot(
      {
        auth: {
          clientId: "", // add client ID here
          authority: "https://login.microsoftonline.com/", //Append tenant id here
          redirectUri: "http://localhost:4200/getToken",
          postLogoutRedirectUri: "https://localhost:4200",
        },
        cache: {
          cacheLocation: "localStorage",
          storeAuthStateInCookie: isIE, // set to true for IE 11
        },
      },
      {
        popUp: !isIE,
        consentScopes: ["user.read", "openid", "profile"],
        protectedResourceMap: [
          ["Enter_the_Graph_Endpoint_Herev1.0/me", ["user.read"]],
        ],
        extraQueryParameters: {},
      }
    ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
