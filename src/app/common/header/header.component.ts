import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { DepartmentService } from "src/app/services/department.service";
import { ConstantService } from "src/app/services/constant.service";
import { CartCountService } from "src/app/services/cart-count.service";
import { AuthService } from 'src/app/services/auth/auth.service';
import { TosterService } from 'src/app/services/toster.service';
import { CartService } from "src/app/services/cart.service";
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

	classToggleHeader: any = '';
	classToggleHeaderHighlighted: any = '';
	showHideMobileSubMenu: any = '';
	isAddClassHighlighted = false;
	loggedinUserId: string;
	isLoggedInFlag: boolean = false;

	deptData: any;
	deptDataFlag = false;
	cartCnt = 0;
	userId: any;
	cartData: any;
	cartDataSet: boolean = false;
	grandTotal: number = 0;

	private departmentSubscription: Subscription;
	private cartSubscription: Subscription;

	constructor(
		private ngxSpinnerService: NgxSpinnerService,
		private departmentService: DepartmentService,
		private constantService: ConstantService,
		private cartCountService: CartCountService,
		private authService: AuthService,
		private tosterService: TosterService,
		private cartService: CartService,
	) { }

	ngOnInit(): void {
		this.getDepts();
		let session = localStorage.getItem('currentUser');
		if( session ) {
			let parsedUser = JSON.parse(session);
			this.loggedinUserId = parsedUser.user._id;
			console.log('this.loggedinUserId', this.loggedinUserId);
			this.isLoggedInFlag = true;
			this.getCartByUserId();
		}

		this.cartCountService.cart$.subscribe( (cnt:number) => {      
			this.cartCnt = cnt;
		} );

	}

	async getDepts() {
		await this.getDeptsCatgs();
	}

	toggleHeader() {
		
		this.classToggleHeader = 'toggle-header';
	}

	toggleBackBtn() {

		this.classToggleHeader = '';
	}

	addClassHighlighted() {
		this.isAddClassHighlighted = !this.isAddClassHighlighted;
		if( this.isAddClassHighlighted ) {
			this.classToggleHeaderHighlighted = 'highlighted';
			this.showHideMobileSubMenu = 'showHide-mobile';
		} else {
			this.classToggleHeaderHighlighted = '';
			this.showHideMobileSubMenu = '';
		}
	}

	getDeptsCatgs() {

		try {

			this.ngxSpinnerService.show();
			this. departmentSubscription = this.departmentService.getAllDepartments().subscribe(
				( result ) => {
					if (result.success) {
						this.deptData = result.data.departments;
						this.deptDataFlag = this.deptData.length > 0 ? true : false;
						console.log('deptData', this.deptData);
					} else {
						this.constantService.handleResCode(result);
					}
				},
				( error ) => {
					this.ngxSpinnerService.hide();
					console.log(error.message);
					let obj = {
						resCode: 400,
						msg: error.message.toString(),
					};
					this.constantService.handleResCode(obj);
				},
				() => {
					this.ngxSpinnerService.hide();
				},
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

	async getCartByUserId() {

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
			this.userId = user._id;

			this.ngxSpinnerService.show();
			this.cartSubscription = this.cartService.getCartByUserId(this.userId).subscribe(
				async (result) => {

					if (result.success) {
						// this.constantService.handleResCode(result);
						this.cartData = result?.data?.cart ? result.data.cart : [];
						this.cartData.length > 0 ? this.cartDataSet = true : false;
						// this.addItem();
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

	addItem() {
		this.cartCountService.addItemToCart( this.cartData );
	}

	calculate() {

		this.grandTotal = 0;
		this.cartData.forEach( (element, index) => {
			
			let product_value = element?.product_detail?.product_price * Math.abs(element.qty);
			this.cartData[index]['product_value'] = product_value;
			this.cartData[index]['qty'] = Math.abs(element.qty);
			this.grandTotal += product_value;
		} );
	}

	identifyDept(index, item) {
		return item.department_title; 
	}

	identifyCatg(index, item) {
		return item.department_title; 
	}

	identifyCart(index, item) {
		return item.qty; 
	}

	public ngOnDestroy(): void {
        
        if (this.departmentSubscription) {
            this.departmentSubscription.unsubscribe();
        }

		if (this.cartSubscription) {
            this.cartSubscription.unsubscribe();
        }
    }
}
