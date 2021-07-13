import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  animations: [
    fadeInAnimation
  ]
})
export class CheckoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
