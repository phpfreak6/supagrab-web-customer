import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/common/animations/fadein-animation';

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
  constructor() {}

  ngOnInit(): void {

    let session = localStorage.getItem('currentUser');
		this.loggedinUserId = '';
		if( session ) {
			let parsedUser = JSON.parse(session);
			this.loggedinUserId = parsedUser.user._id;
		}
  }

}
