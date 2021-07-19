import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";
import { NgxSpinnerService } from "ngx-spinner";

import { WishlistService } from "../../../services/wishlist.service";
import { ConstantService } from "../../../services/constant.service";

@Component({
	selector: 'app-product-by-category',
	templateUrl: './product-by-category.component.html',
	styleUrls: ['./product-by-category.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class ProductByCategoryComponent implements OnInit {

	constructor(
		private ngxSpinnerService: NgxSpinnerService,
		private constantService: ConstantService,
		private wishlistService: WishlistService
	) { }

	ngOnInit(): void {
	}

	addToWishList( productId, productDetails ) {
		
		try {
			
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
