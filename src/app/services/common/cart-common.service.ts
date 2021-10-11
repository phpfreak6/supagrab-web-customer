import { Injectable, OnDestroy } from '@angular/core';

import { NgxSpinnerService } from "ngx-spinner";

import { CartService } from "src/app/services/cart.service";
import { ConstantService } from "src/app/services/constant.service";
import { AuthService } from 'src/app/services/auth/auth.service';
import { TosterService } from 'src/app/services/toster.service';
import { CartCountService } from "src/app/services/cart-count.service";
import { Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CartCommonService implements OnDestroy {

	private cartSubscription: Subscription;
	
	constructor(
		private ngxSpinnerService: NgxSpinnerService,
		private constantService: ConstantService,
		private authService: AuthService,
		private tosterService: TosterService,
		private cartService: CartService,
		private cartCountService: CartCountService
	) { }

	addToCart(productId, productDetails) {

		try {

			if (!this.authService.isLoggedIn()) {

				this.tosterService.error();
				this.tosterService.toastMixin.fire(
					'You need to login first, to add product to the cart.'
				);
				return;
			}

			let data = JSON.parse(localStorage.getItem('currentUser')!);
			let user = data.user;
			let userId = user._id;

			this.ngxSpinnerService.show();
			this.cartSubscription = this.cartService.addToCart(userId, productId).subscribe(
				async (result) => {

					if (result.success) {
						this.cartCountService.addItemToCart( result?.data?.cart );
						// this.constantService.handleResCode(result);
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

	ngOnDestroy(): void {
		
		if( this.cartSubscription ) {
			this.cartSubscription.unsubscribe();
		}
	}
}
