import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css'],
  animations: [
    fadeInAnimation
  ]
})
export class PrivacyPolicyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
