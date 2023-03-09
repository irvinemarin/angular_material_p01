import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const ipRest = "http://172.22.3.65:4000"
// const ipRest = "http://localhost:4000"

const baseUrl = ipRest + '/api/';
const tk = 'eyJhbGciOiJIUzI1NiJ9.c3VwcmVtYQ.cpUyTYcgm8ixIVDTLe-Fua0RLkyUKg8yy2IkAOfKi2I';
let headers = new HttpHeaders().set('authorization', tk);

// headers = headers.set('header-name-2', 'header-value-2');

@Injectable({
  providedIn: 'root'
})
export class FormsClienteWSService {

  constructor(private http: HttpClient) {

  }

  public listRequests = []

  stopAllResquest() {
    this.listRequests.forEach(r => {
      r.subscription.unsubscribe();

    })
  }

  getDataWS(urlParent) {
    let request = this.http.get(baseUrl + urlParent, {headers: headers}
    );

    this.listRequests.push(request)

    return request
  }

  getAllChildrenWS(urlParamsChilds) {
    return this.http.get(baseUrl + urlParamsChilds, {headers: headers});
  }

  getListaUsuarios() {
    return this.http.get(baseUrl + "getLoginListaUsuarios", {headers: headers}
    );
  }

  sendEmail(emailReceptor) {
    return this.http.get(baseUrl + "sendEmail/" + emailReceptor, {headers: headers})

  }

  verifyLogin(params) {
    return this.http.get(`${baseUrl}login/${params}`, {headers: headers})

  }

  getListaTablasNombres() {
    return this.http.get(`${baseUrl}all-origens`, {headers: headers})
  }

  getDetailscolumns(tablename) {
    return this.http.get(`${baseUrl}detailscolumns/${tablename}`, {headers: headers})
  }

  getDataByTableNameFromDB(tablename) {
    return this.http.get(`${baseUrl}getdatatable/${tablename}`, {headers: headers})
  }
}
