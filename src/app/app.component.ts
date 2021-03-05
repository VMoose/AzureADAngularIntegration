import { Component, OnInit } from "@angular/core";
import { MsalService } from "@azure/msal-angular";
import { LoginService } from "./services/LoginService/login.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: MsalService,
    private loginService: LoginService
  ) {}

  title = "quizUI";
  isLogin: boolean = true;
  username: string;
  loggedIn: boolean;

  ngOnInit(): void {
    this.loggedIn = !!this.authService.getAccount();
    this.loginService.checkAccount().subscribe((s) => {
      this.loggedIn = this.loggedIn || s[0];
      this.username = s[1];
    });
  }

  public showSignup(val: boolean): void {
    this.isLogin = !val;
  }

  checkAccount(val: boolean): void {
    this.loggedIn = val;
  }

  logout(val: boolean): void {
    if (!!this.authService.getAccount()) {
      this.authService.logout();
    } else {
      this.loginService.logout().subscribe((s) => {
        this.loggedIn = !s;
      });
    }
  }

  getLoginData(val: string): void {
    this.username = val;
  }
}
