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
	userId: any;
	userAddrForm: FormGroup;
	submitted = false;
	userData: any;

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
		this.isUserIdProvidedFlag = this.userId ? true : false;
	
			if( this.isUserIdProvidedFlag ) {
				// this.getUserById( this.userId );
			} else {
				// user id not provided
			}
		});
	}

	setFormData() {

		try {

			this.userAddrForm.patchValue({
				email: this.userData.email,
				contact_number: this.userData.contact_number,
				first_name: this.userData.first_name,
				last_name: this.userData.last_name
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
