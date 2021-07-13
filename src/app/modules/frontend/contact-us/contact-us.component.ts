import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  animations: [
    fadeInAnimation
  ]
})
export class ContactUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
