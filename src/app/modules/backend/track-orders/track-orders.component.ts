import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/common/animations/fadein-animation';
import { OrderService } from "src/app/services/order.service";
import { ConstantService } from "src/app/services/constant.service";
import { AuthService } from "src/app/services/auth/auth.service";
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
	selector: 'app-track-orders',
	templateUrl: './track-orders.component.html',
	styleUrls: ['./track-orders.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class TrackOrdersComponent implements OnInit {

	orderId;
	isOrderIdSetFlag = false;
	isOrderDetailsSet: boolean;
	orderData: any;
	deliveryDate: Date;
	userData: any;

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private orderService: OrderService,
		private constantService: ConstantService,
		private authService: AuthService,
		private ngxSpinnerService: NgxSpinnerService,
	) { }

	ngOnInit(): void {
		this.activatedRoute.params.subscribe(params => {

			this.orderId = params.orderId;
			this.isOrderIdSetFlag = this.orderId ? true : false;

			if (this.isOrderIdSetFlag) {
				this.getOrderById();
			} else {
				// user id not provided
			}
		});
	}

	async getOrderById() {
		
		this.userData = await this.authService.getLocalUser();
		this.orderService.getOrderById( this.userData._id, this.orderId ).subscribe(
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
			}
		);
	}
}
