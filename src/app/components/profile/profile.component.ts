import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { GraphService } from "src/app/services/GraphService/graph.service";
import { Profile } from "src/app/services/GraphService/Profile";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  @Input() username: string;
  profileData: Profile;
  imageUrl;
  constructor(
    private graphService: GraphService,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    if (this.username == "") {
      this.profileData = await this.graphService.getprofileData();
      this.imageUrl = await this.graphService.getProfilePhoto();
    }
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
