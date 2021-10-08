import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/common/animations/fadein-animation';

@Component({
  selector: 'app-track-orders',
  templateUrl: './track-orders.component.html',
  styleUrls: ['./track-orders.component.css'],
  animations: [
		fadeInAnimation
	]
})
export class TrackOrdersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
