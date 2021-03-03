import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Login } from "./Login";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private http: HttpClient) {}

  baseUrl: string = "http://127.0.0.1:5000";

  Login(loginData: Login) {
    return this.http.post(this.baseUrl + "/login", loginData);
  }
}
