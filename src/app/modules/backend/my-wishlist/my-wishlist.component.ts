import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

@Component({
  selector: 'app-my-wishlist',
  templateUrl: './my-wishlist.component.html',
  styleUrls: ['./my-wishlist.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class MyWishlistComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
