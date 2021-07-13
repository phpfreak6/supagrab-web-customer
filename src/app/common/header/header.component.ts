import { Component, OnInit } from '@angular/core';

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

	constructor() { }

	ngOnInit(): void {
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
}
