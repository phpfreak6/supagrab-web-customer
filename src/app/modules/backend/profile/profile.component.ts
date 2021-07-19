import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

import { UserService } from "../../../services/user.service";
import { ConstantService } from "../../../services/constant.service";

import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class ProfileComponent implements OnInit {

	isUserIdProvidedFlag = false;
	userId: any;
	userForm: FormGroup;
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

		this.userForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			// password: ['', [Validators.required, Validators.minLength(5)]],
			contact_number: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
			first_name: ['', [Validators.required]],
			last_name: ['', [Validators.required]]
		});

		this.setUserId();
	}

	// convenience getter for easy access to form fields
	get f() { return this.userForm.controls; }

	setUserId() {

		this.activatedRoute.params.subscribe( params => {      
		this.userId = params.userId;
		this.isUserIdProvidedFlag = this.userId ? true : false;
	
			if( this.isUserIdProvidedFlag ) {
				this.getUserById( this.userId );
			} else {
				// user id not provided
				let result = {
					resCode: 400,
					msg: "Invalid UserId"
				};
				this.constantService.handleResCode(result);
			}
		});
	}

	getUserById( userId ) {

		try {

			this.ngxSpinnerService.show();
			this.userService.getUserById( userId ).subscribe(
				async (result) => {

					if (result.success) {

						this.userData = result.data.user;
						this.setFormData();
					} else {
						this.constantService.handleResCode(result);
						this.router.navigate(['/dashboard']);
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
					this.router.navigate(['/dashboard']);
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
			this.router.navigate(['/dashboard']);
		}
	}

	setFormData() {

		try {

			this.userForm.patchValue({
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
			console.log('this.userForm.invalid', this.userForm.invalid);
			if (this.userForm.invalid) {
				return;
			}

			let in_data = this.userForm.value;
			in_data.email = in_data.email.toLowerCase();

			console.log('in_data',in_data);
			
			this.userService.updateUser(in_data, this.userId).subscribe( 
				async (result) => {

                    if (result.success) {
                        Swal.fire(
							result.msg,
							'',
							'success'
						);
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
