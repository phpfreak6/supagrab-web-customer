import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConstantService } from 'src/app/services/constant.service';
import { ProductService } from 'src/app/services/product.service';
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

	productData: any;
	productSlug: string;
	isProductSlugFlag = false;
	productImageLink: any;
  
  constructor(
	private activatedRoute: ActivatedRoute,
	private router: Router,
	private ngxSpinnerService: NgxSpinnerService,
	private constantService: ConstantService,
	private productService: ProductService,
  ) { }

  ngOnInit(): void {
	this.setProductSlug();
  }

  setProductSlug() {
    this.activatedRoute.params.subscribe( params => {      
		this.productSlug = params.prodSlug;
		console.log('productSlug', this.productSlug);
		this.isProductSlugFlag = this.productSlug ? true : false;
	
			if( this.isProductSlugFlag ) {
				this.getProductBySlug( this.productSlug );
			} else {
				// user id not provided
				let result = {
					resCode: 400,
					msg: "Invalid ProductId"
				};
				this.constantService.handleResCode(result);
			}
		});
  }

  getProductBySlug( productSlug ) {

	try {

		this.ngxSpinnerService.show();
		this.productService.getProductBySlug( productSlug ).subscribe(
			async (result) => {

				if (result.success) {

					this.productData = result.data.product;
					console.log('this.productData', this.productData);
					this.productImageLink = result.data.PRODUCT_IMAGE_PATH;
				} else {
					this.constantService.handleResCode(result);
				}
			},
			async (error) => {

				this.ngxSpinnerService.hide();
				console.log(error.message);
				let obj = {
					resCode: 400,
					msg: error.message.toString(),
				};
				this.constantService.handleResCode(obj);
			},
			() => {

				// inside complete
				this.ngxSpinnerService.hide();
			}
		);
	} catch( ex ) {

		this.ngxSpinnerService.hide();
		let obj = {
			resCode: 400,
			msg: ex.toString(),
		};
		this.constantService.handleResCode(obj);
		this.router.navigate(['/dashboard']);
	}
  }

  addToCart( product_id: string ) {

    this.router.navigate(['/view/cart']);
  }

  addToWishList( product_id: string ) {

    this.router.navigate(['/view/wish-list']);
  }
}
