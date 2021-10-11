import { Component, OnDestroy, OnInit } from '@angular/core';
import { fadeInAnimation } from "src/app/common/animations/fadein-animation";

import { NgxSpinnerService } from "ngx-spinner";

import { ConstantService } from "src/app/services/constant.service";
import { CmsService } from "src/app/services/cms.service";

import { PageInterface } from "../../../interfaces/PageInterface";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css'],
  animations: [
    fadeInAnimation
  ]
})
export class PrivacyPolicyComponent implements OnInit, OnDestroy {

  	isCmsKeyProvidedFlag = false;
	cmsKey: any;
	submitted = false;
	cmsData: PageInterface;

	private cmsSubscription: Subscription;

	constructor(
		private ngxSpinnerService: NgxSpinnerService,
		private cmsService: CmsService,
		private constantService: ConstantService
	) { }

	ngOnInit(): void {
		this.setCmsKey();
	}

	setCmsKey() {
		
		this.getAddrById( 'privacy-policy' );
	}

	getAddrById( cmsKey ) {

		try {

			this.ngxSpinnerService.show();
			this.cmsSubscription = this.cmsService.getCmsByKey( cmsKey ).subscribe(
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

	public ngOnDestroy(): void {
        
        if (this.cmsSubscription) {
            this.cmsSubscription.unsubscribe();
        }
    }
}
