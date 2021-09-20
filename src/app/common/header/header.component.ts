import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { DepartmentService } from "src/app/services/department.service";
import { ConstantService } from "src/app/services/constant.service";
import { CartCountService } from "src/app/services/cart-count.service";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	classToggleHeader: any = '';
	classToggleHeaderHighlighted: any = '';
	showHideMobileSubMenu: any = '';
	isAddClassHighlighted = false;
	loggedinUserId: string;
	isLoggedInFlag: boolean = false;

	deptData: any;
	deptDataFlag = false;
	cartCnt = 0;

	constructor(
		private ngxSpinnerService: NgxSpinnerService,
		private departmentService: DepartmentService,
		private constantService: ConstantService,
		private cartCountService: CartCountService
	) { }

	ngOnInit(): void {
		this.getDepts();
		let session = localStorage.getItem('currentUser');
		if( session ) {
			let parsedUser = JSON.parse(session);
			this.loggedinUserId = parsedUser.user._id;
			console.log('this.loggedinUserId', this.loggedinUserId);
			this.isLoggedInFlag = true;
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
			this.departmentService.getAllDepartments().subscribe(
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
}
