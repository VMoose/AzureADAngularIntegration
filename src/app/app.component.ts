import { Component, OnInit } from "@angular/core";
import { MsalService } from "@azure/msal-angular";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private authService: MsalService) {}

  title = "quizUI";
  isLogin: boolean = true;
  loggedIn: boolean;

  ngOnInit(): void {
    this.loggedIn = !!this.authService.getAccount();
  }

  public showSignup(val: boolean): void {
    this.isLogin = !val;
  }

  checkAccount(val: boolean): void {
    this.loggedIn = val;
  }

  logout(val: boolean): void {
    this.authService.logout();
  }
}
