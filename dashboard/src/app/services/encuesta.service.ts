import {Injectable, Output, EventEmitter} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  SERVER_URL = environment.server;
  client = environment.client;
  useractual: any = null;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  //funciones utilizadas en dashboard 
  getData() {
    return this.httpClient.get<any>(this.SERVER_URL + 'encuestasdata', {
      //headers: {'Authorization': 'Bearer ' + this.useractual['remember_token']}
      headers: {'Authorization' : 'Bearer ' + this.authService.Autorizacion['remember_token']}
    });
  }

  //funciones utilizadas en dashboard
  getDash() {
    return this.httpClient.get<any>(this.SERVER_URL + 'dash', {
      //headers: {'Authorization': 'Bearer ' + this.useractual['remember_token']}
      headers: {'Authorization' : 'Bearer ' + this.authService.Autorizacion['remember_token']}
    });
  }

  //Funciones del formulario de encuestas no utilizadas en el dashboard
  validateUser(array) {
    return this.httpClient.post(this.SERVER_URL + 'validateUser', array);
  }

  login() {
    return this.httpClient.post(this.SERVER_URL + 'login', {
        headers: {'Authorization': this.client}
      }
    );
  }

  setLocal(value, remember) {
    this.useractual = value;
    if (remember) {
      localStorage.setItem('remember_token', JSON.stringify(this.useractual));
    }
  }

  crearAutorizacion(params) {
    return this.httpClient.post(this.SERVER_URL + 'autorizacion', params, {
      headers: {'Authorization': 'Bearer ' + this.useractual['remember_token']}
    });
  }

  


}
