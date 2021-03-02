import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//import { requiredFileType } from "./requireFileTypeValidators";
import { ActualizarDatosService } from '../services/actualizar-datos.service';
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

  departamentosList = [];
  municipiosList = [];
  municipiosFilter = [];

  coordenadas = null;

  constructor(private formBuilder: FormBuilder,private elementRef: ElementRef, 
    private actualizarDatosService:ActualizarDatosService,
    public formService:FormService, 
    private router: Router, private activatedRouter:ActivatedRoute,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.reportarLlegadaFormGroup = this.formBuilder.group({
      tipoDocumentoCtrl: ['', Validators.required],
      numeroDocumentoCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10) ]],
      telefonoCtrl: ['', [Validators.required, Validators.min(1000000), Validators.max(9999999999)]],
      departamentoCtrl: ['', Validators.required],
      municipioCtrl: ['', Validators.required]
    });

    this.actualizarDatosService.getDepartamentos()
        .subscribe((data: any[]) => {
          this.departamentosList = data;
        });

      this.actualizarDatosService.getMunicipios()
        .subscribe((data: any[]) => {
          this.municipiosList = data;
          this.municipiosFilter = this.municipiosList;
        });

        navigator.geolocation.getCurrentPosition((position) => {
          const coords = {latitud: position.coords.latitude, longitud: position.coords.longitude};
    
          //coordenadas global para guardar en autorizacion
          this.coordenadas = coords;
        });
  }

  selectTipoDocumentoMiembro($event:any):void{
    
  }

  selectDepartamento($event: any): void {
    this.municipiosFilter = this.municipiosList;
    const municipiosnuevo = this.municipiosList.filter(muni => muni.id_departamento == $event.value);
    this.municipiosFilter = municipiosnuevo;
    this.reportarLlegadaFormGroup.controls.municipioCtrl.setValue(null);
  }

  selectMunicipio($event:any):void{
    //console.log('REPORTAR: ', this.reportarLlegadaFormGroup);
  }

  enviarInfo(){

    //console.log('ENVIAR INFO: ');
    this.saving = true;

    let data = {
      'formData' : this.reportarLlegadaFormGroup.value,
      'coordenadas': this.coordenadas
    }
    
    this.actualizarDatosService.reportarLlegada(data).subscribe(res=>{

      if(res['res']){
        this.snackBar.open('Reporte de llegada almacenado correctamente', 'X', {
          duration: 2000
        });
        this.saving = false;
        this.reportarLlegadaFormGroup = this.formBuilder.group({
          tipoDocumentoCtrl: ['', Validators.required],
          numeroDocumentoCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10) ]],
          telefonoCtrl: ['', [Validators.required, Validators.min(1000000), Validators.max(9999999999)]],
          departamentoCtrl: ['', Validators.required],
          municipioCtrl: ['', Validators.required]
        });
      }
        
    },error=>{
      
      this.snackBar.open('Verifique los datos e intente nuevamente', 'X', {
        duration: 2000
      });
      this.saving = false;
      /*this.reportarLlegadaFormGroup = this.formBuilder.group({
        tipoDocumentoCtrl: ['', Validators.required],
        numeroDocumentoCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10) ]],
        telefonoCtrl: ['', [Validators.required, Validators.min(1000000), Validators.max(9999999999)]],
        departamentoCtrl: ['', Validators.required],
        municipioCtrl: ['', Validators.required]
      });*/
    });

    
  }
}
