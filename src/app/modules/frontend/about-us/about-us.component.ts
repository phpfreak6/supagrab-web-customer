import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  animations: [
    fadeInAnimation
  ]
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
