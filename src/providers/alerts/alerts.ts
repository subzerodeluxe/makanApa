import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AlertsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AlertsProvider Provider');
  }

  

}
