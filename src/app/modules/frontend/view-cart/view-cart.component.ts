import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "src/app/common/animations/fadein-animation";

import { CartService } from "src/app/services/cart.service";
import { AuthService } from 'src/app/services/auth/auth.service';
import { TosterService } from 'src/app/services/toster.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ConstantService } from "src/app/services/constant.service";

import Swal from 'sweetalert2';

@Component({
	selector: 'app-view-cart',
	templateUrl: './view-cart.component.html',
	styleUrls: ['./view-cart.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class ViewCartComponent implements OnInit {

	cartData: Array<any>;

	constructor(
		private cartService: CartService,
		private authService: AuthService,
		private tosterService: TosterService,
		private ngxSpinnerService: NgxSpinnerService,
		private constantService: ConstantService,
	) { }

	ngOnInit(): void {
		this.getCartByUserId();
	}

	getCartByUserId() {

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
			this.cartService.getCartByUserId(userId).subscribe(
				async (result) => {

					if (result.success) {
						// this.constantService.handleResCode(result);
						this.cartData = result?.data?.cart ? result.data.cart : [];
						console.log('this.cartData', this.cartData);
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

	confirmRemoveCartItem( userId, cartId ) {

		try {

			Swal.fire({
				title: 'Are you sure?',
				icon: 'question',
				iconHtml: '?',
				confirmButtonText: 'Yes',
				cancelButtonText: 'No',
				showCancelButton: true,
				showCloseButton: true,
			}).then((result) => {
				if (result.value) {
					this.removeCartItem( userId, cartId );
				}
			});
		} catch (ex) {
			console.log('ex', ex);
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

	removeCartItem( userId, cartId ) {

		try {
			
			this.ngxSpinnerService.show();
			this.cartService.delCartByCartId( userId, cartId ).subscribe(
				async (result) => {

					if (result.success) {
						this.getCartByUserId();
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
		} catch( ex ) {
			this.ngxSpinnerService.hide();
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}
}