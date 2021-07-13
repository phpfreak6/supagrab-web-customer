import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css'],
  animations: [
    fadeInAnimation
  ]
})
export class FaqsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
