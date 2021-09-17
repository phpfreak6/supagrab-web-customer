import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "src/app/common/animations/fadein-animation";

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.css'],
  animations: [
    fadeInAnimation
  ]
})
export class OrderPlacedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
