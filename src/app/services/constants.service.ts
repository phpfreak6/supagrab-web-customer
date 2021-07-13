import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  public googleClientId: string = '';
  public googleClientSecret: string = '';

  constructor() { }
}
