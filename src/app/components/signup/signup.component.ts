import { ThrowStmt } from "@angular/compiler";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { SignUp } from "src/app/services/SignupService/SignUp";
import { SignupService } from "src/app/services/SignupService/signup.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  @Output() isSignUp = new EventEmitter<boolean>();
  profileForm = new FormGroup({
    UserName: new FormControl(""),
    Password: new FormControl(""),
    Email: new FormControl(""),
  });
  errorMessage: string;

  constructor(private signUpService: SignupService) {}

  ngOnInit() {}
  showLogIn() {
    this.isSignUp.emit(false);
  }
  onSubmit(submitBtn: HTMLButtonElement) {
    submitBtn.disabled = true;
    this.signUpService.SignUp(this.profileForm.value).subscribe(
      (data: SignUp) => {
        if (data) {
          this.isSignUp.emit(false);
          this.errorMessage = "";
        } else {
          this.errorMessage = "Account already exists please login";
        }
        console.log(data);
        console.log(this.profileForm.value);
      },
      (err) => {}
    );
    submitBtn.disabled = false;
  }
}
