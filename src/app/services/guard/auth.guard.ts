import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { TosterService } from '../toster.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor( 
		private authService: AuthService,
		private tosterService: TosterService,
		private router: Router
	) {}

	canActivate() {

		if (this.authService.isLoggedIn()) {

			return true;
		} else {

			this.tosterService.error();
			this.tosterService.toastMixin.fire('You need to login first to access this route.');
			this.router.navigate(['login']);
			return false;
		}
	}
}
