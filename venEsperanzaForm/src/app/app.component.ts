import {Component, OnInit} from '@angular/core';

import {FormService} from './services/form.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'venEsperanzaForm';
  error = false;
  referrer: any = document.referrer; //origen del trafico
  queryString: any = window.location.search; //obtener url
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  show = true; //debe ser false y habilitar el if de validar referrer


  constructor(private formService: FormService) {
  }

  ngOnInit() {

    //const urlParams = new URLSearchParams(this.queryString);  //url
    //const fbclid = urlParams.get('fbclid'); //parametro fbclid
    //this.referrer = 'http://l.facebook.com'; //valor referer para transito facebook

    /* //Se debe descomentar para validar fuente de transito, ubicación y ip en back
    if (this.referrer.includes('http://l.facebook.com') || this.referrer.includes('https://l.facebook.com')
      || this.referrer.includes('http://facebook.com') || this.referrer.includes('https://facebook.com')
      || this.referrer.includes('http://m.facebook.com') || this.referrer.includes('https://m.facebook.com')
      || this.referrer.includes('http://lm.facebook.com') || this.referrer.includes('http://lm.facebook.com')) {

      //validacion de navegacion comentado provisionalmente
      navigator.geolocation.getCurrentPosition((position) => {
        //geolocalizacion tomada del navegador
        let coords = {'latitud':position.coords.latitude,'longitud':position.coords.longitude};
        //geolocalizacion prueba
        //Cucuta: 7.9116667,-72.5261027
        //let coords = {'latitud': -72.5261027, 'longitud': 7.9116667};
        //VRosario:
        //7.865935,-72.4673127
        //let coords = {'latitud': -72.466412,'longitud':7.823252  };
        //let coords = {'latitud': -72.4673127,'longitud':7.8659352};
        //let coords = {'latitud': -72.478822   ,'longitud':7.576244 }; //por fuera
        let datos = {'coordenadas': coords};
        //console.log("SE CARGA ARRAY COORDENADAS?");
        this.formService.validarUbicacionVR(datos).subscribe(res => {
          //console.log(res);
          // res['existeenpoligono'] = 1;
          //console.log(res['existeenpoligono']);
          if (res['existeenpoligono']) {
            this.show = true;
          } else {
            this.error = true;
          }
        }, error => {
          // console.log("error en validar coordenadas en back")
          this.error = true;
        });
      }, error => {
        this.error = true; //muestra error xq no habilita geolocalizacion
      });
      
    } else {
      this.error = true; //muestra error porq el trafico no proviene de facebook
    }*/
  }

}
