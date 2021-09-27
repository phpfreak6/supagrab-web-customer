import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "src/app/common/animations/fadein-animation";
import { AuthService } from "src/app/services/auth/auth.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ConstantService } from "src/app/services/constant.service";
import { NgxSpinnerService } from "ngx-spinner";
import { CartService } from 'src/app/services/cart.service';
import { TosterService } from 'src/app/services/toster.service';
import { CouponService } from "src/app/services/coupon.service";

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
	subTotal: number = 0;
	
	constructor(
		private authService: AuthService,
		private formBuilder: FormBuilder,
		private constantService: ConstantService,
		private ngxSpinnerService: NgxSpinnerService,
		private cartService: CartService,
		private tosterService: TosterService,
		private couponService: CouponService
	) { }

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
						console.log('this.cartData', this.cartData);
						this.isCartDataSet = true;
						this.calculate();
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

			// console.log('first_name', first_name);
			// console.log('last_name', last_name);

			this.userForm.patchValue({
				title: this.userData.addresses[0].title,
				first_name: this.userData.first_name,
				last_name: this.userData.last_name,
				phone_number: this.userData.addresses[0].phone_number,
				alternate_phone_number: this.userData.addresses[0].alternate_phone_number,
				pincode: this.userData.addresses[0].pincode,
				city: this.userData.addresses[0].city,
				state: this.userData.addresses[0].state,
				country: this.userData.addresses[0].country,
				address: this.userData.addresses[0].address,
				landmark: this.userData.addresses[0].landmark,
				type: this.userData.addresses[0].type,
				email: this.userData.addresses[0].email
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

	onSubmit() {

		try {

			console.log('this.userForm.value', this.userForm.value);
			this.submitted = true;

			// stop here if form is invalid
			if (this.userForm.invalid) {
				window.scrollTo(0, 0);
				return;
			}

			let in_data = this.userForm.value;
			in_data.email = in_data.email.toLowerCase();
			
		} catch (ex) {
			this.ngxSpinnerService.hide();
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
				this.couponMsg = `Flat ${this.discountAmount} off applied successfully.`;
				this.couponMsgType = 'success';

			} else if( this.couponType == 'PERCENTAGE' ) {
				this.grandTotal = this.subTotal - ( ((this.subTotal * this.discountAmount)/100) )
				this.couponMsg = `${this.discountAmount}% off applied successfully.`;
				this.couponMsgType = 'success';
				
			} else {
				this.couponMsg = `You are not eleigible for this coupon.`;
				this.couponMsgType = 'error';
			}
		}
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
						this.couponType = coupon.coupon_type;
						this.couponCode = coupon.coupon_code;
						this.discountAmount = coupon.discount_amount;
						this.isCouponApplied = true;
						this.calculate();
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
