import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
//import { requiredFileType } from "./requireFileTypeValidators";
import {ActualizarDatosService} from '../services/actualizar-datos.service';
import {FormService} from '../services/form.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'reportar-llegada',
  templateUrl: './reportar-llegada.component.html',
  styleUrls: ['./reportar-llegada.component.css']
})
export class ReportarLlegadaComponent implements OnInit {

  saving = false;

  reportarLlegadaFormGroup: FormGroup;

  tipoDocumentos = [
    {name: 'Acta de Nacimiento'},
    {name: 'Cédula de Identidad (venezonala)'},
    {name: 'Cédula de ciudadania (colombiana)'},
    {name: 'Pasaporte'},
    {name: 'Cédula de Extranjería'},
    //{name: 'Indocumentado'},
    {name: 'Otro'}
  ];

  //lista destino final dentro de colombia frecuentes
  ciudadesDepartamentosFrecuentes = [
    {'nombre':'Arauca'},
    {'nombre':'Barranquilla'},
    {'nombre':'Bogotá'},
    {'nombre':'Bucaramanga'},
    {'nombre':'Cali'},
    {'nombre':'Cartagena'},
    {'nombre':'Cúcuta'},
    {'nombre':'Medellín'},
    {'nombre':'Riohacha'},
    {'nombre':'Pasto'},
    {'nombre':'Valledupar'},
    {'nombre':'Otro'}
  ];

  otroDondeTeEncuentras = false;

  departamentosList = [];
  municipiosList = [];
  municipiosFilter = [];

  coordenadas = null;

  numeroContactoAsociadoWA = false;

  constructor(private formBuilder: FormBuilder, private elementRef: ElementRef,
              private actualizarDatosService: ActualizarDatosService,
              public formService: FormService,
              private router: Router, private activatedRouter: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.reportarLlegadaFormGroup = this.formBuilder.group({
      tipoDocumentoCtrl: ['', Validators.required],
      numeroDocumentoCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      nombreJefeHogarCtrl: ['', [Validators.required]],
      numeroContactoCtrl: ['', [Validators.min(1000000), Validators.max(9999999999)]],
      //numeroContactoAsociadoAWhatsappCtrl: ['', [Validators.required]],
      dondeTeEncuentrasCtrl: ['', Validators.required]
      //departamentoCtrl: ['', Validators.required],
      //municipioCtrl: ['', Validators.required]
    });

    /*

    this.actualizarDatosService.getDepartamentos()
      .subscribe((data: any[]) => {
        this.departamentosList = data;
      });

    this.actualizarDatosService.getMunicipios()
      .subscribe((data: any[]) => {
        this.municipiosList = data;
        this.municipiosFilter = this.municipiosList;
      });*/

    navigator.geolocation.getCurrentPosition((position) => {
      const coords = {latitud: position.coords.latitude, longitud: position.coords.longitude};

      //coordenadas global para guardar en autorizacion
      this.coordenadas = coords;
    });
  }

  selectTipoDocumentoMiembro($event: any): void {

  }

  selectDepartamento($event: any): void {
    this.municipiosFilter = this.municipiosList;
    this.municipiosFilter = this.municipiosList.filter(muni => muni.id_departamento == $event.value);
    this.reportarLlegadaFormGroup.controls.municipioCtrl.setValue(null);
  }

  selectMunicipio($event: any): void {
  }

  numeroContacto($event: any): void{
    console.log('$EVENTO:: ', this.reportarLlegadaFormGroup.controls['numeroContactoCtrl']);
    
    if(this.reportarLlegadaFormGroup.controls['numeroContactoCtrl'].status === 'VALID' && this.reportarLlegadaFormGroup.controls['numeroContactoCtrl'].value != null){
      
      this.reportarLlegadaFormGroup.addControl('numeroContactoAsociadoAWhatsappCtrl', new FormControl('',Validators.required));
      this.numeroContactoAsociadoWA = true;

    }else if(( this.reportarLlegadaFormGroup.controls['numeroContactoCtrl'].status === 'INVALID' 
    || this.reportarLlegadaFormGroup.controls['numeroContactoCtrl'].value == null ) 
    && this.reportarLlegadaFormGroup.contains('numeroContactoAsociadoAWhatsappCtrl')){
      
      this.reportarLlegadaFormGroup.removeControl('numeroContactoAsociadoAWhatsappCtrl');
      this.numeroContactoAsociadoWA = false;
    }
    //if($event.status != '')
  }

  selectDondeTeEncuentras($event: any): void{
    
    if ($event.value == 'Otro') { // si es Otro agrega el controlador
     
      this.otroDondeTeEncuentras = true;
      this.reportarLlegadaFormGroup.addControl('otroDondeTeEncuentrasCtrl', new FormControl('',Validators.required));
    
    } else if ($event.value != 'Otro' && this.reportarLlegadaFormGroup.contains('otroDondeTeEncuentrasCtrl')) {
      // si es diferente de Otro y ya contien otro, elimina el controlador de Otro
      this.otroDondeTeEncuentras = false;
      this.reportarLlegadaFormGroup.removeControl('otroDondeTeEncuentrasCtrl');
    
    }
  }

  enviarInfo(): void {

    this.saving = true;

    let data = {
      'formData': this.reportarLlegadaFormGroup.value,
      'coordenadas': this.coordenadas
    };

    this.actualizarDatosService.reportarLlegada(data).subscribe(res => {

      if (res['res']) {
        this.snackBar.open('Gracias por reportar tu llegada.', 'X', {
          duration: 5000
        });
        this.router.navigate(['/']);
        this.saving = false;
        this.reportarLlegadaFormGroup = this.formBuilder.group({
          tipoDocumentoCtrl: ['', Validators.required],
          numeroDocumentoCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
          numeroContactoCtrl: [''],
          numeroWhatsappCtrl: [''],
          departamentoCtrl: ['', Validators.required],
          municipioCtrl: ['', Validators.required]
        });
      }
    }, error => {
      this.snackBar.open('Verifique los datos e intente nuevamente', 'X', {
        duration: 3000
      });
      this.saving = false;
    });


  }
}
