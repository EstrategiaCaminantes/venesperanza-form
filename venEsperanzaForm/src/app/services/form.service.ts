import {Injectable, Output, EventEmitter} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  SERVER_URL = environment.server;
  client = environment.client;
  headers = new HttpHeaders;
  useractual: any = null;

  constructor(private httpClient: HttpClient) {
  }

  Login() {
    let headers = new HttpHeaders;
    let informa;
    informa = this.httpClient.post(this.SERVER_URL + 'login', {
        headers: {'Authorization': this.client}
      }
    );
    return informa;
  }

  setLocal(value, remember) {
    this.useractual = value;
    if (remember) {
      localStorage.setItem('remember_token', JSON.stringify(this.useractual));
    }
  }

  public getValidation(params) {
    return this.httpClient.get('https://ipinfo.io');
    // return this.httpClient.post(this.SERVER_URL + 'validation', params);
  }

  public postForm(data) {
    return this.httpClient.post(this.SERVER_URL + 'encuestas', data, {
      headers: {'Authorization': 'Bearer ' + this.useractual['remember_token']}
    });
  }

  public updateForm(id, data) {
    return this.httpClient.put<any>(this.SERVER_URL + 'encuestas/' + id, data, {
      headers: {'Authorization': 'Bearer ' + this.useractual['remember_token']}
    });
  }

  getDepartamentos() {
    let headers = new HttpHeaders;
    return this.httpClient.get<any>(this.SERVER_URL + 'departamentos', {
      headers: {'Authorization': 'Bearer ' + this.useractual['remember_token']}
    });
  }

  getMunicipios() {
    return this.httpClient.get<any>(this.SERVER_URL + 'municipios', {
      headers: {'Authorization': 'Bearer ' + this.useractual['remember_token']}
    });
  }

  getBarrios() {
    return this.httpClient.get<any>(this.SERVER_URL + 'barrios', {
      headers: {'Authorization': 'Bearer ' + this.useractual['remember_token']}
    });
  }

  getNecesidadesBasicas() {
    return this.httpClient.get<any>(this.SERVER_URL + 'necesidadesbasicas', {
      headers: {'Authorization': 'Bearer ' + this.useractual['remember_token']}
    });
  }


}
