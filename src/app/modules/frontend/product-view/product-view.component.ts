import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
  animations: [
    fadeInAnimation
  ]
})
export class ProductViewComponent implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute, 
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  addToCart( product_id: string ) {

    this.router.navigate(['/view/cart']);
  }

  addToWishList( product_id: string ) {

    this.router.navigate(['/view/wish-list']);
  }
}
