import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "src/app/common/animations/fadein-animation";
import { NgxSpinnerService } from "ngx-spinner";

import { WishlistService } from "src/app/services/wishlist.service";
import { CartService } from "src/app/services/cart.service";
import { CartCommonService } from "src/app/services/common/cart-common.service";
import { ConstantService } from "src/app/services/constant.service";
import { AuthService } from 'src/app/services/auth/auth.service';
import { TosterService } from 'src/app/services/toster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from "src/app/services/product.service";
import { WishlistCommonService } from "src/app/services/common/wishlist-common.service";

import { CartCountService } from "src/app/services/cart-count.service";

@Component({
	selector: 'app-product-by-category',
	templateUrl: './product-by-category.component.html',
	styleUrls: ['./product-by-category.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class ProductByCategoryComponent implements OnInit {

	catgSlug;
  	isCatgSlugProvidedFlag;
	products;
	cartCnt = 0;

	constructor(
		private ngxSpinnerService: NgxSpinnerService,
		private constantService: ConstantService,
		private wishlistService: WishlistService,
		private authService: AuthService,
		private tosterService: TosterService,
		private activatedRoute: ActivatedRoute,
		private productService: ProductService,
		private cartService: CartService,
		private cartCommonService: CartCommonService,
		private wishlistCommonService: WishlistCommonService,
		private cartCountService: CartCountService
	) { }

	ngOnInit(): void {

		this.activatedRoute.params.subscribe( params => {

			this.catgSlug = params.catgSlug ? params.catgSlug : null;
			this.isCatgSlugProvidedFlag = this.catgSlug !== null ? true : false;
			if( this.isCatgSlugProvidedFlag ) {
				this.getProductsByCatgSlug();
			}
		});
	}

	addToWishList( productId, productDetails ) {
		this.wishlistCommonService.addToWishList( productId, productDetails );
	}

	addToCart( productId, productDetails ) {
		this.cartCommonService.addToCart(productId, productDetails);
	}

	getProductsByCatgSlug() {

		this.productService.getProductsByCatgSlug( this.catgSlug )
		.subscribe(
			( result ) => {
				if (result.success) {
					this.products = result.data.product ? result.data.product : [];
				} else {
					// this.constantService.handleResCode(result);
				}
			},
			( error ) => {
				this.ngxSpinnerService.hide();
				console.log(error.message);
				let obj = {
					resCode: 400,
					msg: error.message.toString(),
				};
				this.constantService.handleResCode(obj);
			},
			() => {
				this.ngxSpinnerService.hide();
			},
		);
	}
}