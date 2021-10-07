import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "src/app/common/animations/fadein-animation";
import { OrderService } from "src/app/services/order.service";
import { ConstantService } from "src/app/services/constant.service";
import { AuthService } from "src/app/services/auth/auth.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-my-orders',
	templateUrl: './my-orders.component.html',
	styleUrls: ['./my-orders.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class MyOrdersComponent implements OnInit {

	userId;
	isOrderDetailsSet = false;
	orderData;

	constructor(
		private activatedRoute: ActivatedRoute, 
		private router: Router,
		private orderService: OrderService,
		private constantService: ConstantService,
		private authService: AuthService
	) { }

	ngOnInit(): void {

		this.getOrderByUser();
	}

	async getOrderByUser() {

		let user = await this.authService.getLocalUser();
		this.orderService.getOrderById( this.userId, null ).subscribe(
			async (result) => {
				if( result.success ) {

					this.isOrderDetailsSet = true;
					this.orderData = result.data.order;
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
			}
		);
	}
}
