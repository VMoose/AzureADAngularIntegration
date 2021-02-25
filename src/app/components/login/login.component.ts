import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MsalService, BroadcastService } from "@azure/msal-angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  @Output() isSignUp = new EventEmitter<boolean>();
  @Output() isAuthenticated = new EventEmitter<boolean>();
  requestObj = {
    scopes: ["user.read"],
  };

  constructor(
    private broadcastService: BroadcastService,
    private authService: MsalService
  ) {}

  ngOnInit() {}

  showSignUp() {
    this.isSignUp.emit(true);
  }

  async signUp() {
    const isIE =
      window.navigator.userAgent.indexOf("MSIE ") > -1 ||
      window.navigator.userAgent.indexOf("Trident/") > -1;
    let result;
    if (isIE) {
      result = await this.authService.loginRedirect();
    } else {
      result = await this.authService
        .loginPopup()
        .catch((err) => console.error(err));
    }

    if (result && this.authService.getAccount()) {
      this.isAuthenticated.emit(true);
    }
  }
}
