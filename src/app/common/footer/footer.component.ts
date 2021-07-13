import { Component, OnInit } from '@angular/core';

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

	constructor() { }

	ngOnInit(): void {
	}

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
}
