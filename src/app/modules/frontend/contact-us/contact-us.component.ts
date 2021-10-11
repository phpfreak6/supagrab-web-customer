import { Component, OnDestroy, OnInit } from '@angular/core';
import { fadeInAnimation } from "src/app/common/animations/fadein-animation";

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

import { ConstantService } from "src/app/services/constant.service";
import { ContactUsService } from "src/app/services/contact-us.service";
import { TosterService } from 'src/app/services/toster.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-contact-us',
	templateUrl: './contact-us.component.html',
	styleUrls: ['./contact-us.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class ContactUsComponent implements OnInit, OnDestroy {

	contactUsForm: FormGroup;
	submitted = false;
	disableBtn = false;

	private contactUsSubscription: Subscription;

	constructor(
		private formBuilder: FormBuilder,
		private ngxSpinnerService: NgxSpinnerService,
		private contactUsService: ContactUsService,
		private constantService: ConstantService,
		private tosterService: TosterService
	) { }

	ngOnInit(): void {

		this.contactUsForm = this.formBuilder.group({
			first_name: ['', [Validators.required]],
			last_name: ['', []],
			phone_number: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			message: ['', [Validators.required]]
		});
	}

	// convenience getter for easy access to form fields
	get f() { return this.contactUsForm.controls; }

	onSubmit() {

		try {

			this.submitted = true;

			// stop here if form is invalid
			if (this.contactUsForm.invalid) {
				return;
			}

			this.disableBtn = false;
			let in_data = this.contactUsForm.value;
			console.log('in_data', in_data);
			in_data.email = in_data.email.toLowerCase();

			this.ngxSpinnerService.show();
			this.contactUsSubscription = this.contactUsService.contactUs( in_data ).subscribe( 
				async (result) => {

					if (result.success) {

						// this.constantService.handleResCode(result);
						this.tosterService.success();
						this.tosterService.toastMixin.fire( result.msg );
						this.contactUsForm.reset();
						this.submitted = false;
						this.disableBtn = false;

					} else if (!result.success) {
						// this.constantService.handleResCode(result);
						this.tosterService.error();
						this.tosterService.toastMixin.fire( result.msg );

					} else {}
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

	public ngOnDestroy(): void {
        
        if (this.contactUsSubscription) {
            this.contactUsSubscription.unsubscribe();
        }
    }
}
