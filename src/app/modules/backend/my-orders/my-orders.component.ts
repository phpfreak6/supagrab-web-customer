import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "src/app/common/animations/fadein-animation";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class MyOrdersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
