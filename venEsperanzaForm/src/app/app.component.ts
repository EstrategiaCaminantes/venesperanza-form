import { Component, OnInit } from '@angular/core';

import { FormService } from  './services/form.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  title = 'venEsperanzaForm';

  error = false;
  
  referrer:any = document.referrer; //origen del trafico

   queryString:any = window.location.search; //obtener url


  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  show = false;

  

  constructor( private formService: FormService) {}
 
    ngOnInit(){ 

      //const urlParams = new URLSearchParams(this.queryString);  //url
      //const fbclid = urlParams.get('fbclid'); //parametro fbclid
      this.referrer = "http://l.facebook.com"; //valor referer para transito facebook

      if(this.referrer.includes("http://l.facebook.com") || this.referrer.includes("https://l.facebook.com") 
      || this.referrer.includes("http://facebook.com") || this.referrer.includes("https://facebook.com")
      || this.referrer.includes("http://m.facebook.com") || this.referrer.includes("https://m.facebook.com")
      || this.referrer.includes("http://lm.facebook.com") || this.referrer.includes("http://lm.facebook.com")){

          this.show= true; //muestra formulario. esto se debe eliminar

          //validacion de navegacion comentado provisionalmente
         /*  navigator.geolocation.getCurrentPosition((position) => {
              //console.log("POSITION. ", position);

              // if( (position.coords.latitude >= 7.8155213 && position.coords.latitude <= 7.872665) &&
              // ( position.coords.longitude >= -72.4542771 && position.coords.longitude <= -72.4900311)){
              if(position.coords.latitude == 7.1279139 && position.coords.longitude == -73.1215082){
                // console.log("GEO;: ", position.coords);
                  //console.log("THIS referer: ", this.referrer);
                  
                  this.show = true; //muestra seccion formulario componente form
                  
                  //console.log("value show: ",this.show);
                // console.log("valude error: ",this.error);
              }else{
                  this.error = true; //muestra error porq las coordenadas no corresponden a villa del rosario
                // console.log("error: ", this.error);
                }
                
           },error=>{
                this.error = true; //muestra error xq no habilita geolocalizacion
               });
               */
      }else{
        this.error = true; //muestra error porq el trafico no proviene de facebook
      }

      
    }    
  
}
