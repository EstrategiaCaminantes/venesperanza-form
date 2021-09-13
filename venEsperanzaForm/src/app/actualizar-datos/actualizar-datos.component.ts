import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {ActualizarDatosService} from '../services/actualizar-datos.service';
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
    {name: 'Cédula de Identidad (venezolana)'},
    {name: 'Cédula de ciudadania (colombiana)'},
    {name: 'Pasaporte'},
    {name: 'Cédula de Extranjería'},
    {name: 'Otro'}
  ];


  constructor(private formBuilder: FormBuilder, private elementRef: ElementRef,
              private actualizarDatosService: ActualizarDatosService,
              private router: Router, private activatedRouter: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    this.actualizarFormGroup = this.formBuilder.group({
      tipoDocumentoCtrl: ['', Validators.required],
      numeroDocumentoCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      telefonoCtrl: ['', [Validators.required, Validators.min(1000000), Validators.max(9999999999)]],
      correoCtrl: ['', Validators.required]
    });
  }

  selectTipoDocumentoMiembro($event: any): void {

  }

  validarTelefono($event: any):void{

    if(this.actualizarFormGroup.controls['telefonoCtrl'].status === 'VALID'){

      //this.actualizarFormGroup.setControl('correoCtrl', new FormControl(''));
      this.actualizarFormGroup.controls['correoCtrl'].clearValidators();
      this.actualizarFormGroup.controls['correoCtrl'].updateValueAndValidity();
      //this.actualizarFormGroup.controls['correoCtrl'].updateValueAndValidity();

    }else if(this.actualizarFormGroup.controls['telefonoCtrl'].status === 'INVALID'){

      this.actualizarFormGroup.setControl('correoCtrl', new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_-]+([.][a-zA-Z0-9_-]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')]));
    }
    //console.log('CAMBIO TELEFONO: ', this.actualizarFormGroup);
  
  }

  validarCorreo($event: any):void{
    
  var expreg = new RegExp("[a-zA-Z0-9_-]+([.][a-zA-Z0-9_-]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}");
  
    if(expreg.test($event)){
      //console.log('CORRECTO!');
      this.actualizarFormGroup.controls['telefonoCtrl'].setValidators([]);
      this.actualizarFormGroup.controls['telefonoCtrl'].updateValueAndValidity();
    }else{
      //console.log('INCORRECTO');
      this.actualizarFormGroup.setControl('telefonoCtrl',new FormControl('',[Validators.required, Validators.min(1000000), Validators.max(9999999999)]));

      //this.actualizarFormGroup.setControl('correoCtrl', new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_-]+([.][a-zA-Z0-9_-]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')]));

    }

    //console.log('CAMBIO CORREO: ', this.actualizarFormGroup);

  }

  

  enviarInfo(): void {
    this.saving = true;
    this.actualizarDatosService.actualizarDatos(this.actualizarFormGroup.value).subscribe(res => {
      if (res['res']) {
        this.snackBar.open('Información actualizada correctamente.', 'X', {
          duration: 5000
        });
        this.router.navigate(['/']);
        this.saving = false;
        this.actualizarFormGroup = this.formBuilder.group({
          tipoDocumentoCtrl: ['', Validators.required],
          numeroDocumentoCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
          telefonoCtrl: ['', [Validators.required, Validators.min(1000000), Validators.max(9999999999)]],
          correoCtrl: ['', Validators.required]
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
