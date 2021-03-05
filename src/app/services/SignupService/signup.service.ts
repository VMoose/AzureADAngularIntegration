import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SignUp } from "./SignUp";

@Injectable({
  providedIn: "root",
})
export class SignupService {
  constructor(private http: HttpClient) {}

  baseUrl: string = "http://127.0.0.1:5000";

  SignUp(signupData: SignUp) {
    return this.http.post(this.baseUrl + "/signup", signupData);
  }
}
