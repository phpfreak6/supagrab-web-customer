import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

@Component({
  selector: 'app-product-by-category',
  templateUrl: './product-by-category.component.html',
  styleUrls: ['./product-by-category.component.css'],
  animations: [
    fadeInAnimation
  ]
})
export class ProductByCategoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
