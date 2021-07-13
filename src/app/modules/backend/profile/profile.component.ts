import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
