import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

import { ConstantService } from "../../services/constant.service";
import { NewsletterService } from "../../services/newsletter.service";

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

	classToggleFooter: any = '';
	classToggleHeaderHighlighted: any = '';
	classFooterSubMenu: any = '';
	isAddClassFooterSubMenu = false;

	newsletterForm: FormGroup;
	submitted = false;

	constructor(
		private formBuilder: FormBuilder,
		private ngxSpinnerService: NgxSpinnerService,
		private constantService: ConstantService,
		private newsletterService: NewsletterService
	) { }

	ngOnInit(): void {

		this.newsletterForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]]
		});
	}

	// convenience getter for easy access to form fields
	get f() { return this.newsletterForm.controls; }

	toggleFooter() {
		
		this.classToggleFooter = 'active';
	}

	addClassFooterSubMenu() {

		this.isAddClassFooterSubMenu = !this.isAddClassFooterSubMenu;

		if( this.isAddClassFooterSubMenu ) {
			this.classToggleFooter = 'active';
			this.classFooterSubMenu = 'footer-submenu';
		} else {
			this.classToggleFooter = '';
			this.classFooterSubMenu = '';
		}
	}

	goToTop() {
		window.scrollTo(0, 0);
	}

	newsletterFormOnSubmit() {

		try {
			this.submitted = true;

			// stop here if form is invalid
			if (this.newsletterForm.invalid) {
				return;
			}

			let in_data = this.newsletterForm.value;
			in_data.email = in_data.email.toLowerCase();

			this.ngxSpinnerService.show();
			this.newsletterService.subscribedToNewsLetter(in_data).subscribe( 
				async (result) => {

					if (result.success) {

						this.constantService.handleResCode(result);
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
