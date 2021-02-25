import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @Output() isSignUp = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }
  showLogIn(){
    this.isSignUp.emit(false);
  }
}
