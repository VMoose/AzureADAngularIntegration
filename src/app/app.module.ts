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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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
    FormsModule,
    ReactiveFormsModule,
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
          clientId: "83381cf2-1ae1-4753-9efb-17a132eca08e", // add client ID here
          authority:
            "https://login.microsoftonline.com/87d48a00-488d-4d48-96d3-0f329b69fe49", //Append tenant id here
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
