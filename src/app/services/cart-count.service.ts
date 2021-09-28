import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { CartService } from './cart.service';
import { ConstantService } from './constant.service';
import { TosterService } from './toster.service';

@Injectable({
	providedIn: 'root'
})
export class CartCountService {

	public cart$ = new Subject();
  	public cartItems = 0;
	userId: any;
	cartData: any;
	  
	constructor(
		private cartService: CartService,
		private authService: AuthService,
		private tosterService: TosterService,
		private ngxSpinnerService: NgxSpinnerService,
		private constantService: ConstantService
	) {
		this.cart$.asObservable();
		this.getCartByUserId();
	}

	async getCartByUserId() {

		try {

			if (!this.authService.isLoggedIn()) {

				// this.tosterService.error();
				// this.tosterService.toastMixin.fire(
				// 	'You need to login first, to add product to the cart.'
				// );
				return;
			}

			let usr = await this.authService.getLocalUser();
			this.userId = usr._id;
			console.log('this.userId', this.userId);

			this.ngxSpinnerService.show();
			this.cartService.getCartByUserId(this.userId).subscribe(
				async (result) => {

					if (result.success) {
						// this.constantService.handleResCode(result);
						this.cartData = result?.data?.cart ? result.data.cart : [];
						this.addItemToCart(this.cartData);
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

	addItemToCart( cartData ) {

		this.cartItems = cartData.length;
		this.cart$.next( this.cartItems );
	}
}
