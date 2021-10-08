import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { fadeInAnimation } from "src/app/common/animations/fadein-animation";
import { AuthService } from "src/app/services/auth/auth.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ConstantService } from "src/app/services/constant.service";
import { NgxSpinnerService } from "ngx-spinner";
import { CartService } from 'src/app/services/cart.service';
import { TosterService } from 'src/app/services/toster.service';
import { CouponService } from "src/app/services/coupon.service";
import { OrderService } from "src/app/services/order.service";
import Swal from 'sweetalert2';
import { RazorpayService } from "src/app/services/razorpay/razorpay.service";
import { WindowRefService } from 'src/app/services/razorpay/window-ref.service';

let $this;

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class CheckoutComponent implements OnInit {

	userForm: FormGroup;
	submitted = false;
	userData: any;
	userId: any;
	cartData: any;
	grandTotal: number = 0;
	isCartDataSet: boolean = false;
	shippingCost: number = 0;
	isCouponApplied: boolean = false;
	couponMsg = '';
	couponMsgType = '';
	couponType;
	couponCode;
	discountAmount: number= 0;
	discountAmt: number= 0;
	subTotal: number = 0;

	// razor pay properties starts
	order_id: any;
	razorpay_order_id: any;
	transaction_detail: object = {
		order_id: "",
		razorpay_order_id: "",
		razorpay_payment_id: "",
		razorpay_signature: "",
		response: "",
		options: ""
	};
	// razor pay properties ends

	
	constructor(
		private authService: AuthService,
		private formBuilder: FormBuilder,
		private constantService: ConstantService,
		private ngxSpinnerService: NgxSpinnerService,
		private cartService: CartService,
		private tosterService: TosterService,
		private couponService: CouponService,
		private orderService: OrderService,
		private winRef: WindowRefService,
		private razorpayService: RazorpayService,
		private activatedRoute: ActivatedRoute, 
		private router: Router,
	) {
		$this = this;
	}

	ngOnInit(): void {

		this.userForm = this.formBuilder.group({
			title: ['', [Validators.required]],
			// full_name: ['', [Validators.required]],
			first_name: ['', [Validators.required]],
			last_name: ['', [Validators.required]],

			// phone_number: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
			phone_number: ['', [Validators.required]],
			alternate_phone_number: [],
			// pincode: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
			pincode: ['', [Validators.required]],
			
			city: ['', [Validators.required]],
			state: ['', [Validators.required]],
			country: ['', [Validators.required]],
			address: ['', [Validators.required]],
			landmark: ['', [Validators.required]],
			type: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]]
		});

		this.getLocalUser();
	}

	// convenience getter for easy access to form fields
	get f() { return this.userForm.controls; }

	async getLocalUser() {
		let localUser = await this.authService.getLocalUser();
		if (localUser) {
			this.userData = localUser;
			this.userId = localUser._id;
			this.setFormData();
			this.getCartByUserId();
		}
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

			this.ngxSpinnerService.show();
			this.cartService.getCartByUserId(this.userId).subscribe(
				async (result) => {

					if (result.success) {
						// this.constantService.handleResCode(result);
						this.cartData = result?.data?.cart ? result.data.cart : [];
						this.isCartDataSet = true;
						this.calculate();
					} else {
						this.constantService.handleResCode(result);
					}
				},
				async (error) => {
					this.ngxSpinnerService.hide();
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

	setFormData() {
		try {

			// this.userData = {
			// 	title: 'Amritsar Home',
			// 	full_name: 'Deepak Bawa',
			// 	phone_number: '7508498585',
			// 	alternate_phone_number: '9646255040',
			// 	pincode: '143001',
			// 	city: 'amritsar',
			// 	state: 'punjab',
			// 	country: 'India',
			// 	landmark: 'opp hara wala mandir',
			// 	type: 'HOME',
			// 	email: 'deepak4bawa@gmail.com',
			// 	address: 'house 2439 main bazar gobindpura amritsar',
			// };

			// let first_name = splitted[0] !== undefined ? splitted[0] : null;
			// let last_name = splitted[1] !== undefined ? splitted[1] : null;

			this.userForm.patchValue({
				title: this.userData?.addresses[0]?.title,
				first_name: this.userData?.first_name,
				last_name: this.userData?.last_name,
				phone_number: this.userData?.addresses[0]?.phone_number,
				alternate_phone_number: this.userData?.addresses[0]?.alternate_phone_number,
				pincode: this.userData?.addresses[0]?.pincode,
				city: this.userData?.addresses[0]?.city,
				state: this.userData?.addresses[0]?.state,
				country: this.userData?.addresses[0]?.country,
				address: this.userData?.addresses[0]?.address,
				landmark: this.userData?.addresses[0]?.landmark,
				type: this.userData?.addresses[0]?.type,
				email: this.userData?.addresses[0]?.email
			});
			this.getCartByUserId();
		} catch( ex ) {

			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

	calculate() {

		this.subTotal = 0;
		this.cartData.forEach( (element, index) => {
			
			let product_value = element?.product_detail?.product_price * Math.abs(element.qty);
			this.cartData[index]['product_value'] = product_value;
			this.cartData[index]['qty'] = Math.abs(element.qty);
			this.subTotal += product_value;
		} );

		this.grandTotal = this.subTotal;

		if( this.isCouponApplied ) {

			if( this.couponType == 'FLAT' ) {
				this.grandTotal = this.subTotal - this.discountAmount;
				this.discountAmt = this.discountAmount;
				this.couponMsg = `Flat ${this.discountAmount} off applied successfully.`;
				this.couponMsgType = 'success';

			} else if( this.couponType == 'PERCENTAGE' ) {
				this.discountAmt = ((this.subTotal * this.discountAmount)/100);
				this.grandTotal = this.subTotal - ( this.discountAmt );
				this.couponMsg = `${this.discountAmount}% off applied successfully.`;
				this.couponMsgType = 'success';
				
			} else {
				this.discountAmt = 0;
				this.grandTotal = this.subTotal - ( this.discountAmt );
				this.couponMsg = `Invalid coupon.`;
				this.couponMsgType = 'error';
			}
		} else {
			this.discountAmt = 0;
			this.grandTotal = this.subTotal - ( this.discountAmt );
		}

		if( this.subTotal >= 700 ) {
			this.shippingCost = 0;
		} else {
			this.shippingCost = 50;
		}
		this.grandTotal = this.grandTotal + this.shippingCost;
	}

	setCouponCode( in_CouponCode ) {
		this.couponCode = in_CouponCode;
		this.checkCouponCode();
	}

	checkCouponCode() {
		
		try {

			this.ngxSpinnerService.show();
			this.couponService.getByCouponCode( this.couponCode )
			.subscribe( async (result) => {
				if (result.success) {

					let coupon = result.data.coupon;
					if( coupon ) {

						this.couponType = coupon.coupon_type;
						this.couponCode = coupon.coupon_code;
						this.discountAmount = coupon.discount_amount;
						this.isCouponApplied = true;
					} else {
						this.couponType = 'unknown';
						this.couponCode = null;
						this.discountAmount = 0;
						this.isCouponApplied = true;
					}
					this.calculate();
				} else {
					this.constantService.handleResCode(result);
				}
			},
			async (error) => {
				this.ngxSpinnerService.hide();
				let obj = {
					resCode: 400,
					msg: error.message.toString(),
				};
				this.constantService.handleResCode(obj);
			},
			() => {
				// inside complete
				this.ngxSpinnerService.hide();
			});
		} catch( ex ) {

			this.ngxSpinnerService.hide();
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

	onSubmit() {

		try {

			this.submitted = true;

			// stop here if form is invalid
			if (this.userForm.invalid) {
				window.scrollTo(0, 0);
				return;
			}

			let in_data = this.userForm.value;
			in_data.email = in_data.email.toLowerCase();
			in_data.coupon_code = this.couponCode;

			in_data.transaction_id = '123abc';
			in_data.payment_mode = 'UPI';
			in_data.amount = this.grandTotal;
			in_data.transaction_status = 'PENDING';
			in_data.shipping_charge = this.shippingCost;
			in_data.coupon_applied = this.isCouponApplied;
			in_data.coupon_code = this.couponCode;
			this.insertOrder( in_data );
			
		} catch (ex) {
			this.ngxSpinnerService.hide();
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

	insertOrder( in_data ) {

		try {
			this.ngxSpinnerService.show();
			this.orderService.orderPlaced( this.userId, in_data )
			.subscribe( async (result) => {
				
				if (result.success) {
					let order = result.data.order;
					$this.razorpay_order_id = result.data.razorpay_order_id;
					$this.order_id = order._id;
					$this.payWithRazor();
				} else {
					this.constantService.handleResCode(result);
				}
			},
			async (error) => {
				this.ngxSpinnerService.hide();
				let obj = {
					resCode: 400,
					msg: error.message.toString(),
				};
				this.constantService.handleResCode(obj);
			},
			() => {
				// inside complete
				this.ngxSpinnerService.hide();
			});

		} catch( ex ) {
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

	confirmRemoveCoupon(couponCode :HTMLInputElement) {
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
					couponCode.value = '';
					this.couponCode = '';
					this.isCouponApplied = false;
					this.calculate();
				}
			});
		} catch (ex) {
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

	payWithRazor() {
		const options: any = {

			"key": "rzp_test_48cTOMEXh9OIUO", // Enter the Key ID generated from the Dashboard
			"amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
			"currency": "INR",
			"name": "Acme Corp",
			"description": "Test Transaction",
			"image": "https://example.com/your_logo",
			"order_id": $this.razorpay_order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
			// "handler": function (response){

			// 	console.log('response', response);
			// 	console.log('response.razorpay_payment_id', response.razorpay_payment_id);
			// 	razorpay_payment_id = response.razorpay_payment_id;
			// },
			// "callback_url": "http://localhost:3000/razorpay/callbackUrl",
			"handler": "",
			"prefill": {
				"name": "Deepak Bawa",
				"email": "bawa_d@ymail.com",
				"contact": "7508498585"
			},
			"notes": {
				"address": "Razorpay Corporate Office"
			},
			"theme": {
				"color": "#3399cc"
			},
			"modal": {
				// We should prevent closing of the form when esc key is pressed.
				escape: false,
			},
		};
		options.handler = ((response: any, error: any) => {

			if( error ) {

				console.log('error', error);
			} else {

				options.response = response;

				this.transaction_detail = {
					order_id: $this.order_id,
					razorpay_payment_id: response.razorpay_payment_id,
					razorpay_order_id: response.razorpay_order_id,
					razorpay_signature: response.razorpay_signature,
					razorpay_response: response,
					razorpay_options: options,

				};

				console.log('response', response);
				console.log('options', options);
				// call your backend api to verify payment signature & capture transaction
				this.isPaymentSuccessfull();
			}
		});
		options.modal.ondismiss = (() => {
			// handle the case when user closes the form while transaction is in progress
			console.log('Transaction cancelled.');
			this.updateOrderStatus();
		});
		const rzp = new this.winRef.nativeWindow.Razorpay(options);
		rzp.open();
	}

	isPaymentSuccessfull() {

		this.transaction_detail['order_id'] = $this.order_id;
		this.razorpayService.isPaymentSuccessfull( this.userId, this.transaction_detail ).subscribe(
			async (result) => {
				this.router.navigate(['/order-placed/', $this.order_id]).then(() => { window.location.reload(); });
			},
			async (error) => {
				console.log('error', error);
			}
		);
	}

	updateOrderStatus() {

		try {
			this.ngxSpinnerService.show();
			this.orderService.updateOrderStatus( this.userId, this.order_id )
			.subscribe( async (result) => {
				
				if (result.success) {
					this.constantService.handleResCode(result);
				} else {
					this.constantService.handleResCode(result);
				}
			},
			async (error) => {
				this.ngxSpinnerService.hide();
				let obj = {
					resCode: 400,
					msg: error.message.toString(),
				};
				this.constantService.handleResCode(obj);
			},
			() => {
				// inside complete
				this.ngxSpinnerService.hide();
			});

		} catch( ex ) {
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

	identify(index, item){
		return item.product_detail?.product_title; 
	}
}
