import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MsalService } from "@azure/msal-angular";
import { AuthenticationParameters } from "msal";
import { Profile } from "./Profile";

@Injectable({
  providedIn: "root",
})
export class GraphService {
  resourceUri = "https://graph.microsoft.com/";
  accessTokenRequest: AuthenticationParameters = {
    scopes: ["user.read"],
  };
  profileImg: any;

  constructor(
    private http: HttpClient,
    private authService: MsalService,
    private sanitizer: DomSanitizer
  ) {}

  private getAccessToken() {
    return this.authService
      .acquireTokenSilent(this.accessTokenRequest)
      .then(function (accessTokenResponse) {
        // Acquire token silent success
        return accessTokenResponse.accessToken;
      })
      .catch(function (error) {
        //Acquire token silent failure, and send an interactive request
        console.log(error);
        if (error.errorMessage.indexOf("interaction_required") !== -1) {
          this.authService.acquireTokenRedirect(this.accessTokenRequest);
        }
      });
  }
  async getprofileData() {
    var accessToken = this.getAccessToken();

    const headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + (await accessToken)
    );

    var response = this.http
      .get<Profile>(this.resourceUri + "v1.0/me/", { headers })
      .toPromise();
    return response;
  }

  async getProfilePhoto() {
    var accessToken = this.getAccessToken();

    const headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + (await accessToken)
    );

    return this.http
      .get(this.resourceUri + "beta/me/photo/$value", {
        responseType: "arraybuffer",
        headers,
      })
      .toPromise()
      .then(
        (data) => {
          const TYPED_ARRAY = new Uint8Array(data);
          // converts the typed array to string of characters
          const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);

          //converts string of characters to base64String
          let base64String = btoa(STRING_CHAR);

          //sanitize the url that is passed as a value to image src attrtibute
          this.profileImg = this.sanitizer.bypassSecurityTrustUrl(
            "data:image/*;base64, " + base64String
          );
          return this.profileImg;
        },
        (err) => {
          this.profileImg = "../../../assets/profile.JPG";
          return this.profileImg;
        }
      );
  }
}
