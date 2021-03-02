import {Injectable, Output, EventEmitter} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActualizarDatosService {
  SERVER_URL = environment.server;
  client = environment.client;
  headers = new HttpHeaders;
  useractual: any = null;

  constructor(private httpClient: HttpClient) {
  }

  actualizarDatos(data){
    return this.httpClient.post(this.SERVER_URL + 'actualizardatos', data, {
      headers: {'Authorization': 'Bearer ' + this.client}
      });
  }

  reportarLlegada(data){
    return this.httpClient.post(this.SERVER_URL + 'reportarllegada', data, {
        headers: {'Authorization': 'Bearer ' + this.client}
      });
  }

  getDepartamentos() {
    let headers = new HttpHeaders;
    return this.httpClient.get<any>(this.SERVER_URL + 'departamentosllegada', {
      headers: {'Authorization': this.client}
    });
  }

  getMunicipios() {
    return this.httpClient.get<any>(this.SERVER_URL + 'municipiosllegada', {
      headers: {'Authorization': this.client}
    });
  }


}
