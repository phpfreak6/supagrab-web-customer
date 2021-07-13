import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css'],
  animations: [
    fadeInAnimation
  ]
})
export class TermsAndConditionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
