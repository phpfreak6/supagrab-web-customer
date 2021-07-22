import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

import { NgxSpinnerService } from "ngx-spinner";

import { ConstantService } from "../../../services/constant.service";
import { CmsService } from "../../../services/cms.service";

import { PageInterface } from "../../../interfaces/PageInterface";

@Component({
	selector: 'app-about-us',
	templateUrl: './about-us.component.html',
	styleUrls: ['./about-us.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class AboutUsComponent implements OnInit {

	isCmsKeyProvidedFlag = false;
	cmsKey: any;
	submitted = false;
	cmsData: PageInterface;

	constructor(
		private ngxSpinnerService: NgxSpinnerService,
		private cmsService: CmsService,
		private constantService: ConstantService
	) { }

	ngOnInit(): void {
		this.setCmsKey();
	}

	setCmsKey() {
		
		this.getAddrById( 'about-us' );
	}

	getAddrById( cmsKey ) {

		try {

			this.ngxSpinnerService.show();
			this.cmsService.getCmsByKey( cmsKey ).subscribe(
				( result ) => {
					if (result.success) {
						this.cmsData = result.data.cms;
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
