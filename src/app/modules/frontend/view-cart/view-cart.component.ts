import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css'],
  animations: [
    fadeInAnimation
  ]
})
export class ViewCartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
