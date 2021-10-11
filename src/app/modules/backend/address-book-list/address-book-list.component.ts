import { Component, OnDestroy, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/common/animations/fadein-animation';

import { NgxSpinnerService } from "ngx-spinner";

import { UserService } from "src/app/services/user.service";
import { ConstantService } from "src/app/services/constant.service";

import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-address-book-list',
	templateUrl: './address-book-list.component.html',
	styleUrls: ['./address-book-list.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class AddressBookListComponent implements OnInit, OnDestroy {

	public loggedinUserId = '';
	public addrList = [];

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private ngxSpinnerService: NgxSpinnerService,
		private userService: UserService,
		private constantService: ConstantService
	) { }

	ngOnInit(): void {

		let session = localStorage.getItem('currentUser');
		console.log('session',session);
		this.loggedinUserId = '';
		if (session) {
			console.log('inside session');
			let parsedUser = JSON.parse(session);
			this.loggedinUserId = parsedUser.user._id;
			this.getAllAddresses();
		} else {

			let obj = {
				resCode: 401,
				msg: 'Session ended',
			};
			this.constantService.handleResCode(obj);
		}
	}

	getAllAddresses() {

		try {

			this.ngxSpinnerService.show();
			this.userService.getAllAddressesByUserId( this.loggedinUserId ).subscribe(
				(result) => {
					if (result.success) {
						this.addrList = result.data.user.addresses;
					} else {
						this.constantService.handleResCode(result);
					}
				},
				(error) => {
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

	ConfirmDelUsrAddr( userId, addrId ) {

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
					this.delAddressByUserIdAddressId( userId, addrId );
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

	delAddressByUserIdAddressId( userId, addrId ) {

		try {

			this.ngxSpinnerService.show();
			this.userService.delAddressByUserIdAddressId( userId, addrId ).subscribe(
				(result) => {
					if (result.success) {
						this.getAllAddresses();
						this.constantService.handleResCode(result);
					} else {
						this.constantService.handleResCode(result);
					}
				},
				(error) => {
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

	identify( index, item ) {
		return item.title;
	}

	public ngOnDestroy(): void {}
}
