import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PriceService {

  constructor(private http: Http) {
  }

  public oilUrl = "https://www.quandl.com/api/v1/datasets/CHRIS/CME_CL1.json?api_key=2ormc4EiXzERXCzmcsx-";
  public gasUrl = "https://www.quandl.com/api/v1/datasets/CHRIS/CME_NG1.json?api_key=2ormc4EiXzERXCzmcsx-";

  getOilPrice() {
    return this.http.get(this.oilUrl)
      .map((response: Response) => {
        return response.json();
      })
  }

  getGasPrice() {
    return this.http.get(this.gasUrl)
      .map((response: Response) => {
        return response.json();
      })
  }



}
