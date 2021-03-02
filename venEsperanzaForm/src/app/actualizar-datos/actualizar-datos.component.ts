import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//import { requiredFileType } from "./requireFileTypeValidators";
import { ActualizarDatosService } from '../services/actualizar-datos.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'actualizar-datos',
  templateUrl: './actualizar-datos.component.html',
  styleUrls: ['./actualizar-datos.component.css']
})
export class ActualizarDatosComponent implements OnInit {

  saving = false;

  actualizarFormGroup: FormGroup;

  tipoDocumentos = [
    {name: 'Acta de Nacimiento'},
    {name: 'Cédula de Identidad (venezonala)'},
    {name: 'Cédula de ciudadania (colombiana)'},
    {name: 'Pasaporte'},
    {name: 'Cédula de Extranjería'},
    //{name: 'Indocumentado'},
    {name: 'Otro'}
  ];


  constructor(private formBuilder: FormBuilder,private elementRef: ElementRef,
     private actualizarDatosService:ActualizarDatosService,
    private router: Router, private activatedRouter:ActivatedRoute,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

      this.actualizarFormGroup = this.formBuilder.group({
        tipoDocumentoCtrl: ['', Validators.required],
        numeroDocumentoCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10) ]],
        telefonoCtrl: ['', [Validators.required, Validators.min(1000000), Validators.max(9999999999)]],
        correoCtrl: ['', Validators.required]
      });
  }

  selectTipoDocumentoMiembro($event:any):void{
    
  }

  enviarInfo(){

    //console.log('ENVIAR INFO: ');
    this.saving = true;
    
    this.actualizarDatosService.actualizarDatos(this.actualizarFormGroup.value).subscribe(res=>{

      if(res['res']){
        this.snackBar.open('Información actualizada correctamente', 'X', {
          duration: 2000
        });
        this.saving = false;
        this.actualizarFormGroup = this.formBuilder.group({
          tipoDocumentoCtrl: ['', Validators.required],
          numeroDocumentoCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10) ]],
          telefonoCtrl: ['', [Validators.required, Validators.min(1000000), Validators.max(9999999999)]],
          correoCtrl: ['', Validators.required]
        });
      }
        
    },error=>{

      this.snackBar.open('Verifique los datos e intente nuevamente', 'X', {
        duration: 2000
      });
      
      
      this.saving = false;
      /*
      this.actualizarFormGroup = this.formBuilder.group({
        tipoDocumentoCtrl: ['', Validators.required],
        numeroDocumentoCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10) ]],
        telefonoCtrl: ['', [Validators.required, Validators.min(1000000), Validators.max(9999999999)]],
        correoCtrl: ['', Validators.required]
      });*/
    });

    
  }
}
