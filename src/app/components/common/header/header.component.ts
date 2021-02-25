import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn: boolean;
  @Output() signOut = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  logout() {
    this.signOut.emit(false);
  }
}
