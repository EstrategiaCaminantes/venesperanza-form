import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient ,HttpClientModule  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  SERVER_URL = "http://127.0.0.1:8000/api/"; //local
  //SERVER_URL = "" //prod

  //idvalidacion = null;
  //@Output() change: EventEmitter<any> = new EventEmitter();
  

  constructor(private httpClient: HttpClient) { }


  //envio info del formulario
  /*
  postForm(data){
    this.httpClient.post<any>(this.SERVER_URL+'encuestas', data).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }*/
  public getIp(){
    return this.httpClient.get("http://jsonip.appspot.com/");
  }

  public getValidation(params){
    return this.httpClient.post(this.SERVER_URL+'validation',params); 
  }

/*
  public validationId(valor) {
    this.idvalidacion = valor;
    console.log("CHANGE VAL- ", this.idvalidacion);
    this.change.emit(this.idvalidacion);
  }

  public getValidacionId(){
    
    return this.idvalidacion;
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
