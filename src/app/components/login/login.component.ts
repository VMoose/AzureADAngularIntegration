import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MsalService, BroadcastService } from "@azure/msal-angular";
import { Login } from "src/app/services/LoginService/Login";
import { LoginService } from "src/app/services/LoginService/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  @Output() isSignUp = new EventEmitter<boolean>();
  @Output() isAuthenticated = new EventEmitter<boolean>();
  @Output() loginData = new EventEmitter<string>();
  requestObj = {
    scopes: ["user.read"],
  };
  profileForm = new FormGroup({
    UserName: new FormControl(""),
    Password: new FormControl(""),
  });

  constructor(
    private broadcastService: BroadcastService,
    private authService: MsalService,
    private loginService: LoginService
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

  onSubmit(submitBtn: HTMLButtonElement) {
    submitBtn.disabled = true;
    this.loginService.Login(this.profileForm.value).subscribe(
      (data: Login) => {
        this.isAuthenticated.emit(true);
        this.loginData.emit(data.UserName);
      },
      (err) => {}
    );
    submitBtn.disabled = false;
  }
}
