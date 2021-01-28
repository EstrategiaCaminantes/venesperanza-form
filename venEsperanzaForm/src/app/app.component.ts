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
  show: any = false; // debe ser false y habilitar el if de validar referrer


  constructor(private formService: FormService) {
  }

  ngOnInit() {
    const urlParams = new URLSearchParams(this.queryString);  // url
    const isv = urlParams.get('isv'); // parametro isv
    navigator.geolocation.getCurrentPosition((position) => {
      let coords = {'latitud': position.coords.latitude, 'longitud': position.coords.longitude};
      let datos = {'coordenadas': coords, 'adf': isv, 'ref': this.referrer};
      this.formService.validateUser(datos).subscribe(res => {
        this.show = (res['valid'] == true) ? 1 : 2;
      }, error => {
        this.show = 2;
      });
    }, error => {
      this.show = 2;
    });

  }
}
