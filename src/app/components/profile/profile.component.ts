import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { GraphService } from "src/app/services/graph.service";
import { Profile } from "src/app/services/Profile";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  profileData: Profile;
  imageUrl;
  constructor(
    private graphService: GraphService,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    this.profileData = await this.graphService.getprofileData();
    this.imageUrl = await this.graphService.getProfilePhoto();
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
