import { Injectable } from '@angular/core';
import { HttpClient ,HttpClientModule  } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  SERVER_URL = environment.server;
  constructor(private httpClient: HttpClient) { }


  //envio info del formulario
  /*
  postForm(data){
    this.httpClient.post<any>(this.SERVER_URL+'encuestas', data).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }*/
  public postForm(data){
      return this.httpClient.post(this.SERVER_URL+'encuestas',data);
  }



  public updateForm(id,data){
    return this.httpClient.put<any>(this.SERVER_URL+ 'encuestas/' + id,data);
  }

  getDepartamentos(){
    return this.httpClient.get<any>(this.SERVER_URL+'departamentos');
  }

  getMunicipios(){
    return this.httpClient.get<any>(this.SERVER_URL+'municipios');
  }

  getNecesidadesBasicas(){
    return this.httpClient.get<any>(this.SERVER_URL+'necesidadesbasicas');
  }

  deleteCluster(benID){
    return this.httpClient.delete<any>(this.SERVER_URL + '/' + benID);
  }


}
