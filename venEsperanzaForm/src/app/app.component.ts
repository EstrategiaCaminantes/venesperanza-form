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
  text = 'Validando enlace';
  error = false;
  referrer: any = document.referrer; // origen del trafico
  queryString: any = window.location.search; // obtener url
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  show = false; // debe ser false y habilitar el if de validar referrer


  constructor(private formService: FormService) {
  }

  ngOnInit() {
    const urlParams = new URLSearchParams(this.queryString);  // url
    const isv = urlParams.get('isv'); // parametro isv
    if (this.referrer.includes('facebook.com')) {
      navigator.geolocation.getCurrentPosition((position) => {
        let coords = {'latitud': position.coords.latitude, 'longitud': position.coords.longitude};
        let datos = {'coordenadas': coords, 'adf': isv};
        this.formService.validateUser(datos).subscribe(res => {
          if (res['valid'] == true) {
            this.show = true;
          } else {
            this.error = true;
            this.text = 'No estás autorizado/a para ingresar a esta página.';
          }
        }, error => {
          this.error = true;
          this.text = 'No estás autorizado/a para ingresar a esta página.';
        });
      }, error => {
        this.error = true; // muestra error xq no habilita geolocalizacion
        this.text = 'Debes compartir tu ubicación para continuar con el proceso';
      });
    } else {
      this.error = true; // muestra error porq el trafico no proviene de facebook
      this.text = 'No estás autorizado/a para ingresar a esta página.';
    }
  }
}
