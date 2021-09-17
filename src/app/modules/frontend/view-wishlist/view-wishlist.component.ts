import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

import { NgxSpinnerService } from "ngx-spinner";

import { WishlistService } from "src/app/services/wishlist.service";
import { ConstantService } from "src/app/services/constant.service";

import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
	selector: 'app-view-wishlist',
	templateUrl: './view-wishlist.component.html',
	styleUrls: ['./view-wishlist.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class ViewWishlistComponent implements OnInit {

	wishList: any[];
	userId: any;
	constructor(
		private ngxSpinnerService: NgxSpinnerService,
		private constantService: ConstantService,
		private wishlistService: WishlistService,
		private authService: AuthService
	) { }

	ngOnInit(): void {

		if( this.authService.isLoggedIn() ) {

			let data = JSON.parse(localStorage.getItem('currentUser')!);
			let user = data.user;
			this.userId = user._id;
			this.getAllWishListByUserId();
		} else {

			this.wishList = [];
		}
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
					this.deleteWishListById( wishListId );
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

	deleteWishListById( wishListId ) {

		try {

			this.ngxSpinnerService.show();
			this.wishlistService.delWishListByWishListId( this.userId, wishListId ).subscribe(
				async (result) => {

                    if (result.success) {
						this.getAllWishListByUserId();
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
