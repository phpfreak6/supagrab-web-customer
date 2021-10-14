import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConstantService } from 'src/app/services/constant.service';
import { ProductService } from 'src/app/services/product.service';
import { fadeInAnimation } from "src/app/common/animations/fadein-animation";

import { AuthService } from 'src/app/services/auth/auth.service';
import { TosterService } from 'src/app/services/toster.service';
import { WishlistService } from "src/app/services/wishlist.service";

import { WishlistCommonService } from "src/app/services/common/wishlist-common.service";
import { CartCommonService } from "src/app/services/common/cart-common.service";
import { Subscription } from 'rxjs';

let $this;

@Component({
	selector: 'app-product-view',
	templateUrl: './product-view.component.html',
	styleUrls: ['./product-view.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class ProductViewComponent implements OnInit, OnDestroy {
	
	countdownConfig = {};

	productData: any;
	productSlug: string;
	isProductSlugFlag = false;
	productImageLink: any;
	lastActivatedTabId = 0;
	productImages: Array<object> = [
		{ path: '../assets/images/custom/20210414_201442-min.jpg' },
		{ path: '../assets/images/custom/20210414_174357-min-1.jpg' },
		{ path: '../assets/images/custom/20210424_125241-min.jpg' },
		{ path: '../assets/images/custom/20210424_125511-min.jpg' }
	];

	private productSubscription: Subscription;

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private ngxSpinnerService: NgxSpinnerService,
		private constantService: ConstantService,
		private productService: ProductService,
		private authService: AuthService,
		private tosterService: TosterService,
		private wishlistService: WishlistService,
		@Inject(DOCUMENT) private document: Document,
		private cartCommonService: CartCommonService,
		private wishlistCommonService: WishlistCommonService
	) {
		$this = this;
	}

	ngOnInit(): void {
		this.setProductSlug();
	}

	setProductSlug() {
		this.activatedRoute.params.subscribe(params => {
			this.productSlug = params.prodSlug;
			this.isProductSlugFlag = this.productSlug ? true : false;

			if (this.isProductSlugFlag) {
				this.getProductBySlug(this.productSlug);
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

	getProductBySlug(productSlug) {

		try {

			this.ngxSpinnerService.show();
			this.productSubscription = this.productService.getProductBySlug(productSlug).subscribe(
				async (result) => {

					if (result.success) {

						this.productData = result.data.product;
						console.log('this.productData', this.productData);
						this.productImageLink = result.data.PRODUCT_IMAGE_PATH;
						
						$this.countdownConfig = {
							leftTime: 60, // in seconds
							format: 'mm:ss'
						};					
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
			this.router.navigate(['/dashboard']);
		}
	}

	addToCart( productId, productDetails ) {
		this.cartCommonService.addToCart(productId, productDetails);
	}

	addToWishList( productId, productDetails ) {
		this.wishlistCommonService.addToWishList( productId, productDetails );
	}

	showTabDetails(indx) {

		let reff1 = this.document.getElementById('href-' + this.lastActivatedTabId).classList.remove('active');
		let reff11 = this.document.getElementById('href-' + this.lastActivatedTabId).classList.remove('show');

		let reff2 = this.document.getElementById('href-' + indx).classList.add('active');
		let reff22 = this.document.getElementById('href-' + indx).classList.add('show');

		this.lastActivatedTabId = indx;
	}

	identify(index, item){
		return item?.tab_name; 
	}

	public ngOnDestroy(): void {
        
        if (this.productSubscription) {
            this.productSubscription.unsubscribe();
        }
    }
}
