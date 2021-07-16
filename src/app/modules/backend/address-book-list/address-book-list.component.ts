import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/common/animations/fadein-animation';

import { NgxSpinnerService } from "ngx-spinner";

import { UserService } from "../../../services/user.service";
import { ConstantService } from "../../../services/constant.service";

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
export class AddressBookListComponent implements OnInit {

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
		this.loggedinUserId = '';
		if (session) {
			let parsedUser = JSON.parse(session);
			this.loggedinUserId = parsedUser.user._id;
			this.getAllAddresses();
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
}
