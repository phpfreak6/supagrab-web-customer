import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

const toastMixinSuccess = Swal.mixin({
	// background: 'green',
	toast: true,
	icon: 'success',
	title: 'General Title',
	// animation: false,
	position: 'top-right',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer)
		toast.addEventListener('mouseleave', Swal.resumeTimer)
	}
});

const toastMixinError = Swal.mixin({
	// background: 'red',
	toast: true,
	icon: 'error',
	title: 'General Title',
	// animation: false,
	position: 'top-right',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer)
		toast.addEventListener('mouseleave', Swal.resumeTimer)
	}
});

@Injectable({
	providedIn: 'root'
})

export class TosterService {

	public toastMixin: any;

	constructor() {
	}

	success() {
		this.toastMixin = toastMixinSuccess;
	}

	error() {
		this.toastMixin = toastMixinError;
	}
}
