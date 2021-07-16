import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

import { UserService } from "../../../services/user.service";
import { ConstantService } from "../../../services/constant.service";

import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-address-book',
	templateUrl: './address-book.component.html',
	styleUrls: ['./address-book.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class AddressBookComponent implements OnInit {

	isUserIdProvidedFlag = false;
	isAddrIdProvidedFlag = false;
	userId: any;
	addrId: any;
	userAddrForm: FormGroup;
	submitted = false;
	userAddrData: any;

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private formBuilder: FormBuilder,
		private ngxSpinnerService: NgxSpinnerService,
		private userService: UserService,
		private constantService: ConstantService
	) { }

	ngOnInit(): void {

		this.userAddrForm = this.formBuilder.group({
			title: ['', [Validators.required]],
			full_name: ['', [Validators.required]],

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

		this.setUserId();
	}

	// convenience getter for easy access to form fields
	get f() { return this.userAddrForm.controls; }

	setUserId() {

		this.activatedRoute.params.subscribe( params => {      
		this.userId = params.userId;
		this.addrId = params.addrId;
		this.isUserIdProvidedFlag = this.userId ? true : false;
		this.isAddrIdProvidedFlag = this.userId ? true : false;		
	
			if( this.isAddrIdProvidedFlag ) {
				this.getAddrById( this.userId, this.addrId );
			} else {
				// user id not provided
			}
		});
	}

	getAddrById( user_id, addr_id ) {

		try {

			this.ngxSpinnerService.show();
			this.userService.getAddressByUserIdAddressId( user_id, addr_id ).subscribe(
				( result ) => {
					if (result.success) {
						this.userAddrData = result.data.user.addresses;
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

	setFormData() {

		try {

			this.userAddrForm.patchValue({
				title: this.userAddrData.title,
				full_name: this.userAddrData.full_name,
				phone_number: this.userAddrData.phone_number,
				alternate_phone_number: this.userAddrData.alternate_phone_number,
				pincode: this.userAddrData.pincode,
				city: this.userAddrData.city,
				state: this.userAddrData.state,
				country: this.userAddrData.country,
				address: this.userAddrData.address,
				landmark: this.userAddrData.landmark,
				type: this.userAddrData.type,
				email: this.userAddrData.email
			});
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

			this.submitted = true;

			// stop here if form is invalid
			console.log('this.userAddrForm.invalid', this.userAddrForm.invalid);
			if (this.userAddrForm.invalid) {
				window.scrollTo(0, 0);
				return;
			}

			let in_data = this.userAddrForm.value;
			in_data.email = in_data.email.toLowerCase();

			this.userService.insertUserAddress(in_data, this.userId).subscribe( 
				async (result) => {

                    if (result.success) {
                        Swal.fire(
							result.msg,
							'',
							'success'
						);
						this.router.navigate(['/address-book-list']);
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

}
