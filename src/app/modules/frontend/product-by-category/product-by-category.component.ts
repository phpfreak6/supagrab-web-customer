import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";
import { NgxSpinnerService } from "ngx-spinner";

import { WishlistService } from "../../../services/wishlist.service";
import { ConstantService } from "../../../services/constant.service";
import { AuthService } from 'src/app/services/auth/auth.service';
import { TosterService } from 'src/app/services/toster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from "../../../services/product.service";

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

	constructor(
		private ngxSpinnerService: NgxSpinnerService,
		private constantService: ConstantService,
		private wishlistService: WishlistService,
		private authService: AuthService,
		private tosterService: TosterService,
		private activatedRoute: ActivatedRoute,
		private productService: ProductService
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
		
		console.log('productId', productId);
		console.log('productDetails', productDetails);

		try {			

			if( !this.authService.isLoggedIn() ) {

				this.tosterService.error();
				this.tosterService.toastMixin.fire(
					'You need to login first, to add product to the cart.'
				);
				return;
			}

			let data = JSON.parse(localStorage.getItem('currentUser')!);
			let user = data.user;
			let userId = user._id;
			let in_data = {
				product_id: productId,
				product_detail: productDetails
			};
			
			this.ngxSpinnerService.show();
			this.wishlistService.addToWishList(in_data, userId).subscribe( 
				async (result) => {

                    if (result.success) {
                        this.constantService.handleResCode(result);
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
		} catch (ex) {
			this.ngxSpinnerService.hide();
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
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
