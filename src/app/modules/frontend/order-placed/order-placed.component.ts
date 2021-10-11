import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInAnimation } from "src/app/common/animations/fadein-animation";
import { OrderService } from "src/app/services/order.service";
import { ConstantService } from "src/app/services/constant.service";
import { AuthService } from "src/app/services/auth/auth.service";
import { OrderInterface } from 'src/app/interfaces/order-interface';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-order-placed',
	templateUrl: './order-placed.component.html',
	styleUrls: ['./order-placed.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class OrderPlacedComponent implements OnInit, OnDestroy {

	orderId;
	isOrderIdProvidedFlag = false;
	orderData;
	isOrderDetailsSet = false;
	deliveryDate;

	private orderSubscription: Subscription;

	constructor(
		private activatedRoute: ActivatedRoute, 
		private router: Router,
		private orderService: OrderService,
		private constantService: ConstantService,
		private authService: AuthService
	) { }

	ngOnInit(): void {

		// orderId
		this.activatedRoute.params.subscribe( params => {
		this.orderId = params.orderId;
		this.isOrderIdProvidedFlag = this.orderId ? true : false;
	
			if( this.isOrderIdProvidedFlag ) {
				this.getOrderDetails();
			} else {
				// user id not provided
				let result = {
					resCode: 400,
					msg: "Invalid OrderId"
				};
				this.constantService.handleResCode(result);
			}
		});
	}

	async getOrderDetails() {

		let user = await this.authService.getLocalUser();
		this.orderSubscription = this.orderService.getOrderById( user._id, this.orderId ).subscribe(
			async (result) => {
				if( result.success ) {

					this.isOrderDetailsSet = true;
					this.orderData = result.data.order;
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

	goToOrder() {
		this.router.navigate(['/my-orders']);
	}

	identify(index, item){
		return item?.product_detail?.product_title; 
	}

	public ngOnDestroy(): void {
        
        if (this.orderSubscription) {
            this.orderSubscription.unsubscribe();
        }
    }
}
