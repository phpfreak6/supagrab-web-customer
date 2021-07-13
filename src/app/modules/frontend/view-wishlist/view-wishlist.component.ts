import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

@Component({
  selector: 'app-view-wishlist',
  templateUrl: './view-wishlist.component.html',
  styleUrls: ['./view-wishlist.component.css'],
  animations: [
    fadeInAnimation
  ]
})
export class ViewWishlistComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
