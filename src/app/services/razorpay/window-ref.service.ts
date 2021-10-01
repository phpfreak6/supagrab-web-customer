import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

function _window(): any {
	// return the global native browser window object
	return window;
}

@Injectable({
	providedIn: 'root'
})
export class WindowRefService {

	constructor() {}

	get nativeWindow(): any {
		return _window();
	}
}