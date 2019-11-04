import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { retry } from 'rxjs/operators';

const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'Bearer';
@Injectable({
  providedIn: 'root'
})

export class APIService {
  httpOptions: any;
  cur_record: any;
  api_url :String;
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        observe: 'response',
        responseType: 'json',
        Authorization : `${AUTH_PREFIX} ${localStorage.getItem("id_token")}`
      }),
      withCredentials: true 
    };
    this.api_url = `http://localhost:8084/`;
    
  }

  public Login(ClientModel: any) {
    let reqBody: any;
    reqBody = {
      idictParams: this.GetClientDetails(),
      iobjClientModel: ClientModel,

    };
    return this.httpClient.post(`${this.api_url}Login/`, reqBody, this.httpOptions);
  }

  public Process(model: string, aenmOperation: number, ClientModel: any , aobjCustomMethodInfo?: any) {
    let reqBody: any;
    reqBody = {
      istrModel: model,
      ienmOperation: aenmOperation,
      idictParams: this.GetClientDetails(),
      iobjClientModel: ClientModel,
      iobjCustomMethodInfo : aobjCustomMethodInfo,
    };

    return this.httpClient.post(`${this.api_url}Process/`, reqBody, this.httpOptions);
  }
  public GetDropDowns(aintCodeId: number, astrModel: string, aenmLoadType: number, aobjCustomMethodInfo?: any) {
    let reqBody: any;
    reqBody = {
      iintCodeId: aintCodeId,
      istrModel: astrModel,
      iobjCustomMethodInfo: aobjCustomMethodInfo,
      ienmLoadType: aenmLoadType,
      idictParams: this.GetClientDetails(),
    };
    console.dir(reqBody);
    return this.httpClient.post(`${this.api_url}GetDropDowns/`, reqBody, this.httpOptions);
  }
  public GetReportData() {
    return this.httpClient.get(`${this.api_url}GetReportData/`);
  }
  public GetAuditInfo() {
    return this.httpClient.get(`${this.api_url}GetAuditInfo/`);
  }


  public GetClientDetails(): any {
    return {
      userAgent: navigator.userAgent
    };
  }

  // tslint:disable-next-line: variable-name
  public setSelectedRecord(selected_record: any) {
    this.cur_record = selected_record;
  }

  public getSelectedRecord(): Observable<any> {
    return of(this.cur_record);
  }
}
