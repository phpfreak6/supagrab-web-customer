import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "src/app/common/animations/fadein-animation";
import { OrderService } from "src/app/services/order.service";
import { ConstantService } from "src/app/services/constant.service";
import { AuthService } from "src/app/services/auth/auth.service";
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
	selector: 'app-my-orders',
	templateUrl: './my-orders.component.html',
	styleUrls: ['./my-orders.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class MyOrdersComponent implements OnInit {

	userData;
	userId;
	isOrderDetailsSet = false;
	orderData;
	deliveryDate;

	constructor(
		private activatedRoute: ActivatedRoute, 
		private router: Router,
		private orderService: OrderService,
		private constantService: ConstantService,
		private authService: AuthService,
		private ngxSpinnerService: NgxSpinnerService,
	) { }

	ngOnInit(): void {

		this.getOrderByUser();
	}

	async getOrderByUser() {

		this.userData = await this.authService.getLocalUser();
		this.ngxSpinnerService.show();
		this.orderService.getOrderByUser( this.userData._id ).subscribe(
			async (result) => {
				if( result.success ) {

					this.isOrderDetailsSet = true;
					this.orderData = result.data.order;
					console.log('this.orderData', this.orderData);
					this.deliveryDate = new Date();
  					this.deliveryDate.setDate( this.deliveryDate.getDate() + 10 );
				} else {
					let result = {
						resCode: 400,
						msg: "No record found"
					};
					this.constantService.handleResCode(result);
				}
			},
			async (ex) => {
				let result = {
					resCode: 400,
					msg: ex.toString()
				};
				this.constantService.handleResCode(result);
			},
			async () => {
				this.ngxSpinnerService.hide();
			}
		);
	}

	identify( index, item ) {
		return item._id;
	}
}
