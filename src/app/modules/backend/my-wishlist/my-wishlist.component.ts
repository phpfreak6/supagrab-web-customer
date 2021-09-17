import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "src/app/common/animations/fadein-animation";

import { NgxSpinnerService } from "ngx-spinner";

import { WishlistService } from "src/app/services/wishlist.service";
import { ConstantService } from "src/app/services/constant.service";
import { WishlistCommonService } from "src/app/services/common/wishlist-common.service";

import Swal from 'sweetalert2';

@Component({
	selector: 'app-my-wishlist',
	templateUrl: './my-wishlist.component.html',
	styleUrls: ['./my-wishlist.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class MyWishlistComponent implements OnInit {

	public wishList: any[];
	public userId: any;

	constructor(
		private ngxSpinnerService: NgxSpinnerService,
		private constantService: ConstantService,
		private wishlistService: WishlistService,
		private wishlistCommonService: WishlistCommonService
	) { }

	ngOnInit(): void {

		let data = JSON.parse(localStorage.getItem('currentUser')!);
		let user = data.user;
		this.userId = user._id;
		this.getAllWishListByUserId();
	}

	getAllWishListByUserId() {

		try {

			this.wishList = [];
			this.ngxSpinnerService.show();
			this.wishlistService.getAllWishListByUserId(this.userId).subscribe(
				async (result) => {

                    if (result.success && parseInt(result.data?.wishlist_items.length) > 0 ) {
						this.wishList = result.data.wishlist_items;

                    } else if( !result.success ) {
                        this.constantService.handleResCode(result);

                    } else {
						console.log('result', result);
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

	confirmDeleteWishListById( wishListId ) {

		this.wishlistCommonService.confirmDeleteWishListById( wishListId, this.userId )
		// this.getAllWishListByUserId();
	}

	
}
