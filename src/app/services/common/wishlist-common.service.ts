import { Injectable } from '@angular/core';

import { NgxSpinnerService } from "ngx-spinner";

import { WishlistService } from "src/app/services/wishlist.service";
import { ConstantService } from "src/app/services/constant.service";
import { AuthService } from 'src/app/services/auth/auth.service';
import { TosterService } from 'src/app/services/toster.service';

@Injectable({
	providedIn: 'root'
})
export class WishlistCommonService {

	constructor(
		private ngxSpinnerService: NgxSpinnerService,
		private constantService: ConstantService,
		private authService: AuthService,
		private tosterService: TosterService,
		private wishlistService: WishlistService
	) { }

	addToWishList(productId, productDetails) {

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
}
