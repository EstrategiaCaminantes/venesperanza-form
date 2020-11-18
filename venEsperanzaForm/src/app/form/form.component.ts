import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';

import {FormService} from '../services/form.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import {MatStepper} from '@angular/material/stepper';

@Component({
  //  selector: 'form-encuesta',
  selector: 'form-encuesta',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  mati: any = document.createElement('mati-button'); // boton mati
  infoencuesta = {}; // datos de la encuesta
  id = null; // id del formulario
  title = 'venEsperanzaForm';
  isLinear = true; // paso a paso lineal

  // banderas
  termnsandconditions = true;
  autorizationPolicy = false;
  autorizationConditions = false;
  titleheader = true;
  quentionaccepttermns = true;
  mujeres = false;
  thanksmessage = false;
  finishmessage = false;
  otroTipoDocumento = false;
  formPrincipal = false;
  numeroDocumento = true;
  contactoAlternativoInput = false;
  lineacontactoWhatsappInput = false;

  otroSexoEncuestado = false;

  mostrarOtroSexoMiembrosFamilia = []; //Array para definir true/false y mostrar campo otro sexo en cada miembro de familia agregado

  myDate = new Date(); //fecha actual para inhabilitar seleccion de fechas de nacimiento mayores a la actual

  // firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourFormGroup: FormGroup;
  fiveFormGroup: FormGroup;
  sixFormGroup: FormGroup;
  sevenFormGroup: FormGroup;
  eightFormGroup: FormGroup;
  nineFormGroup: FormGroup;
  tenFormGroup: FormGroup;

  public autorizacionSeleccionada: number;

  nacionalidades = [
    {name: 'Colombiana'},
    {name: 'Venezolana'},
    {name: 'Otro'}
  ];

  tipoDocumentos = [
    {name: 'Acta de Nacimiento'},
    {name: 'Cédula de Identidad (venezonala)'},
    {name: 'Cédula de ciudadania (colombiana)'},
    {name: 'Indocumentado'},
    {name: 'Otro'}
  ];


  departamentosList = [];
  municipiosList = [];
  municipiosFilter = [];
  barriosVillaRosarioList = []; //barrios villa del rosario
  necesidadesList = [];


// esto no se usa
  otrosmiembros = [
    {
      'primer_nombre': '',
      'segundo_nombre': '',
      'primer_apellido': '',
      'segundo_apellido': '',
      'sexo': '',
      'fecha_nacimiento': ''

    }
  ];

  autorizacion_actual = null;

  miembrosFamilia: any; // variable que se le asigna al grupo familiar

  error = false; // bandera para no intentar guardar 2 veces al hacer click en siguiente de cada paso

  @ViewChild('stepper') stepper: MatStepper;


  constructor(private _formBuilder: FormBuilder, private formService: FormService, private _snackBar: MatSnackBar, private elementRef: ElementRef) {
  }

  ngOnInit() {

    //console.log("FECHA ACTUAL",this.myDate);

    this.formService.Login().subscribe(res => {
      // console.log('RESPUESTA LOGIN', res); // login exitoso se genera token

      this.formService.setLocal(res, false);
      this.formService.getDepartamentos()
        .subscribe((data: any[]) => {
          this.departamentosList = data;
          //  console.log('DEPARTAMENTOS: ', data);
        });

      this.formService.getMunicipios()
        .subscribe((data: any[]) => {
          this.municipiosList = data;
          this.municipiosFilter = this.municipiosList;
          // console.log('MUNICIPIOS: ', data);
        });

      this.formService.getBarrios()
        .subscribe((data: any[]) => {
          this.barriosVillaRosarioList = data;
        });

      this.formService.getNecesidadesBasicas()
        .subscribe((data: any[]) => {
          this.necesidadesList = data;
        });

    }, error => {

    });

    // llamados para valores de los selects


    // crea los formsGroup


    this.secondFormGroup = this._formBuilder.group({
      firstNameCtrl: ['', Validators.required],
      secondNameCtrl: [''],
      lastNameCtrl: ['', Validators.required],
      secondLastNameCtrl: [''],
      sexoCtrl: ['', Validators.required],
      fechaNacimientoCtrl: ['', Validators.required],
      nacionalidadCtrl: ['', Validators.required],
      tipoDocumentoCtrl: ['', Validators.required],
      numeroDocumentoCtrl: ['', [Validators.required, Validators.min(100)]]
    });


    this.thirdFormGroup = this._formBuilder.group({
      departamentoCtrl: ['', Validators.required],
      municipioCtrl: ['', Validators.required],
      barrioCtrl: ['', Validators.required],
      direccionCtrl: [''],
      numeroContactoCtrl: ['', [Validators.required, Validators.min(1000000), Validators.max(9999999999)]],
      lineaContactoPropiaCtrl: ['', Validators.required],
      correoCtrl: [''],
      comentarioAdicionalCtrl: ['']
    });


    this.fourFormGroup = this._formBuilder.group({
      unicoMiembro: [''],
      miembrosFamilia: new FormArray([])

    });

    // asigna a la variable global de miembrosFamilia el controlador de tipo array
    this.miembrosFamilia = this.fourFormGroup.get('miembrosFamilia') as FormArray;


    this.fiveFormGroup = this._formBuilder.group({
      mujeresEmbarazadasCtrl: [''],
      mujeresLactantesCtrl: [''],
      personasDiscapacidadCtrl: [''],
      personasEnfermedadesCronicasCtrl: ['']
    });


    this.sixFormGroup = this._formBuilder.group({
      alimentos11Ctrl: [''],
      alimentos12Ctrl: [''],
      alimentos13Ctrl: [''],
      alimentos14Ctrl: [''],
      alimentos15Ctrl: [''],
      alimentos16Ctrl: ['']


    });
    this.sevenFormGroup = this._formBuilder.group({
      necesidades17Ctrl: ['', Validators.required],
      necesidades22Ctrl: this._formBuilder.array([], Validators.required)
    });


    this.eightFormGroup = this._formBuilder.group({
      alojamientoViviendaCtrl: [''],
    });

    this.nineFormGroup = this._formBuilder.group({
      economicoCtrl: [''],
      gastoHogarCtrl: [''],
      gastoHogar7diasCtrl: ['']
    });

    this.tenFormGroup = this._formBuilder.group({
      tenCtrl: ['', Validators.required]
    });


  }

// Primer paso aceptar terminos
  termsAccept($event: any) {
    //  console.log($event);
    this.termnsandconditions = false;
    this.quentionaccepttermns = false;
    this.titleheader = false;
    if ($event == false) {
      this.formPrincipal = false;
      this.finishmessage = true;
    } else if ($event == true) {
      let datos_aceptar_condiciones = {
        'tratamientoDatos': true,
        'terminosCondiciones': true,
        'condiciones': true
      };
      this.formService.crearAutorizacion(datos_aceptar_condiciones).subscribe(res => {

        if (res) {
          this.autorizacion_actual = res;
          this.formPrincipal = true;
        } else {
          this.formPrincipal = false;
          this.finishmessage = true;
        }
      }, error => {
        this.formPrincipal = false;
        this.finishmessage = true;
      });
    }
  }

// validacion tipo documento
  selectTipoDocumento($event: any) {
    // console.log('ENTRO A OTRO', $event.value);
    if ($event.value == 'Otro') { // si es Otro agrega el controlador
      // console.log('ES OTRO');
      this.otroTipoDocumento = true;
      this.secondFormGroup.addControl('otroTipoDocumentoCtrl', new FormControl('', Validators.required));
    } else if ($event.value != 'Otro' && this.secondFormGroup.contains('otroTipoDocumentoCtrl')) {
      // si es diferente de Otro y ya contien otro, elimina el controlador de Otro
      // console.log('NO ES OTRO');
      this.otroTipoDocumento = false;
      this.secondFormGroup.removeControl('otroTipoDocumentoCtrl');
    }
    if ($event.value == 'Indocumentado') { // Si es indocumentado elimina controlador de numero documento
      this.secondFormGroup.removeControl('numeroDocumentoCtrl');
      this.numeroDocumento = false;
    } else if ($event.value != 'Indocumentado' && !this.secondFormGroup.contains('numeroDocumentoCtrl')) {
      // si es diferente a indocumentado y el formgroup no contiene numerodocumento, crea el controlador de numero documento
      this.secondFormGroup.addControl('numeroDocumentoCtrl', new FormControl('', [Validators.required, Validators.min(100)]));
      this.numeroDocumento = true;
    }
  }

// validacion tipo documento
  alimentosSeleccion($event: any, field) {
    if ($event.value == '1') {
      this.sixFormGroup.controls[field].setValidators([Validators.required]);
    } else {
      this.sixFormGroup.controls[field].clearValidators();
    }
    this.sixFormGroup.controls[field].updateValueAndValidity();
  }

// selecciona departamento y filtra lso municipios
  selectDepartamento($event: any) {
    // console.log('DEPARTAMENTO : ', $event);
    this.municipiosFilter = this.municipiosList;
    const municipiosnuevo = this.municipiosList.filter(muni => muni.id_departamento == $event.value);
    this.municipiosFilter = municipiosnuevo;
    // console.log('MUNICIPIOS: ', this.municipiosFilter);
    this.thirdFormGroup.controls['municipioCtrl'].setValue(null);
    // console.log('MUNICIPIO ACTUAL: ', this.thirdFormGroup.controls['municipioCtrl']);
  }

  selectMunicipio($event: any) {
    //console.log('MUNICIPIO SELECCIONADO: ', $event);
    //console.log("EL MUNICIPIO EN THIRD FORMGROUP: ",this.thirdFormGroup.controls['municipioCtrl']);
    if ($event != 820) {
      //console.log("selecciona municipio diferente", this.thirdFormGroup.controls['barrioCtrl'].value);
      this.thirdFormGroup.controls['barrioCtrl'].setValue('');


    }
  }


// validacion de linea de contacto propia, muestra o oculta los campos segun la seleccion
  lineaContactoPropia($event: any) {
    /* console.log('LINEA EVENTO: ', $event);
     console.log('LINEA EVENTO: ', $event.value);
     console.log('LINEA EVENTO: ', $event.value.toString());
     console.log('LINEA DE CONTACTO: ', this.thirdFormGroup.controls['lineaContactoPropiaCtrl'].value);
     console.log('LINEA EVENTO: ', this.thirdFormGroup.controls['lineaContactoPropiaCtrl']);*/
    if ($event.value === 'si') { // si la linea de contacto es propia, oculta contacto alternativo y muestra linea whatsapp
      this.contactoAlternativoInput = false;
      this.lineacontactoWhatsappInput = true;
      // crea controlador de lineacontactowhatsapp
      this.thirdFormGroup.addControl('lineaContactoAsociadaAWhatsappCtrl', new FormControl('',
        [Validators.required, Validators.min(1000000), Validators.max(9999999999)]));
      if (this.thirdFormGroup.contains('contactoAlternativoCtrl')) {
        // elimina controlador si existe
        this.thirdFormGroup.removeControl('contactoAlternativoCtrl');
      }
    } else if ($event.value === 'no') { // si linea de contacto no es propia
      this.contactoAlternativoInput = true;  // muestra contacto alternativo
      this.lineacontactoWhatsappInput = false; // oculta linea contacto whatsapp
      this.thirdFormGroup.addControl('contactoAlternativoCtrl', new FormControl('', [Validators.required, Validators.min(1000000), Validators.max(9999999999)])); // crea controlador para contactoalternativo
      if (this.thirdFormGroup.contains('contactoAlternativoCtrl')) { // si ya existe contacto alternativo elimina linea whatsapp
        this.thirdFormGroup.removeControl('lineaContactoAsociadaAWhatsappCtrl');
      }
    }
  }

// validacion de seleccion si es mujer
  seleccionSexo(posicion): void {
    //console.log("Posicion desde donde hago el llamado: ",posicion);
    let muj = false;
    this.fourFormGroup.controls['miembrosFamilia'].value.forEach(item => {
      muj = (muj || item.sexoCtrl === 'mujer');
    });
    this.mujeres = (muj || this.secondFormGroup.value.sexoCtrl === 'mujer');

    /*
    //cuando selecciono "otro" sexo en datos del encuestado paso 1
    //console.log("seleccion en sexo datos encuestado: ",this.secondFormGroup.controls['sexoCtrl']);
    if (this.secondFormGroup.controls['sexoCtrl'].value == 'otro' && !this.secondFormGroup.contains('otroSexoCtrl')) {
      this.secondFormGroup.addControl('otroSexoCtrl', new FormControl('', Validators.required));
      this.otroSexoEncuestado = true;
    } else if (this.secondFormGroup.controls['sexoCtrl'].value !== 'otro' && this.secondFormGroup.contains('otroSexoCtrl')) {
      this.secondFormGroup.removeControl('otroSexoCtrl');
      this.otroSexoEncuestado = false;
    }
    //cuando selecciono sexo en otro miembro de familia
    if (posicion != 'principal') {

      if(this.miembrosFamilia.controls.length>0){
        //si el controlador del miembro de familia selecciona "otro" sexo por primera vez, el controlador no existe en el formulario dle miembro
          if (this.miembrosFamilia.controls[posicion].controls['sexoCtrl'].value == 'otro' &&
          !this.miembrosFamilia.controls[posicion].contains('otroSexoCtrl')) {
          //console.log("EL EL MIEMBRO NO CONTIENE SEXOCTRL");
          //agrega el controlador al miembro d ela familia
          this.miembrosFamilia.controls[posicion].addControl('otroSexoCtrl', new FormControl('', Validators.required));
          //muestra el campo para agregar el otro sexo
          this.mostrarOtroSexoMiembrosFamilia[posicion] = true;
          //console.log("LO QUE TENGO EN OTRO SEXO MIEMBROS ARRAY FAMILIA: ",this.mostrarOtroSexoMiembrosFamilia);
          //si el controlador de sexo es diferente de "otro" y además anteriormente había seleccioando la opción "otro"
        } else if (this.miembrosFamilia.controls[posicion].controls['sexoCtrl'].value !== 'otro' &&
          this.miembrosFamilia.controls[posicion].contains('otroSexoCtrl')) {
          //remuevo el controlador otrosexoctrl del miembro de la familia
          this.miembrosFamilia.controls[posicion].removeControl('otroSexoCtrl');
          //console.log("CONTROLADOR MIEMBROS FAMILIA: ", this.miembrosFamilia);
          //oculto el campo de ingresar el valor de otro sexo
          this.mostrarOtroSexoMiembrosFamilia[posicion] = false;
          //console.log("EL MIEMBRO SI CONTIENE SEXOCTRL");
        }

      }

    }
    */
  }

// Seleccion de necesidades basicas
  changeNecesidades(e) {
    if (e.value == 'ninguna' || e.value == 'algunas') {
      this.sevenFormGroup.controls.necesidades22Ctrl.setValidators([Validators.required]);
      //console.log(" NECESIDADES NINGUNA ALGUNAS: ",this.sevenFormGroup.controls.necesidades22Ctrl);

    } else {
      this.sevenFormGroup.controls.necesidades22Ctrl.clearValidators();
      this.sevenFormGroup.controls.necesidades22Ctrl['controls'] = [];
      //console.log(" NECESIDADES ELSE: ",this.sevenFormGroup.controls.necesidades22Ctrl);

    }
    this.sevenFormGroup.controls.necesidades22Ctrl.updateValueAndValidity();
    //console.log(" NECESIDADES DESPUES: ",this.sevenFormGroup.controls.necesidades22Ctrl);
  }

// Seleccion de necesidades basicas
  setNecedidadesBasicas(e): void {
    const checkArray: FormArray = this.sevenFormGroup.controls['necesidades22Ctrl'] as FormArray;
    if (checkArray.value.length > 2 && e.target.checked) {
      return e.preventDefault();
    }
    // si esta seleccionado lo agrega al array
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      // si no esta checkeado lo busca y lo elimina
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  toggleEcon(e): void {
    this.nineFormGroup.controls.gastoHogarCtrl.setValue((e.checked) ? '1' : '0');
    if (!e.checked) {
      this.nineFormGroup.controls.gastoHogar7diasCtrl.setValidators([Validators.required, Validators.min(1000)]);
    } else {
      this.nineFormGroup.controls.gastoHogar7diasCtrl.clearValidators();
    }
    this.nineFormGroup.controls.gastoHogar7diasCtrl.updateValueAndValidity();
  }

  toggleMiembro(e): void {
    this.fourFormGroup.controls.unicoMiembro.setValue((!!e.checked));
  }

  toggleAutorTrat(e): void {
    this.autorizationPolicy = (!!e.checked);
  }

  toggleAutorCond(e): void {
    this.autorizationConditions = (!!e.checked);
  }

  iniciaValidacion(event) {
    /*setTimeout(() => {
      this.elementRef.nativeElement.querySelector(`[data-qa="StartSubmit"]`)
        .addEventListener('click', this.validacionTerminada.bind(this));
    }, 5000);*/
    // console.log(event);
  }

  validacionTerminada(event) {
    // console.log(event);
  }

  finalizar() {
    this.titleheader = false;
    this.formPrincipal = false;
    this.thanksmessage = true;
  }

// Agrega miembro del hogar
  agregarNuevoMiembro() {
    // console.log('AGREGO GRUPO AL ARRAY DE MIEMBROS FAMILIA:');
    // Crea un form array de los controles del miembro familiar y agrega un formgroup para cada nuevo miembro
    const chekgroup: FormArray = this.fourFormGroup.controls['miembrosFamilia'] as FormArray;
    const controle = new FormGroup({
      primernombreCtrl: new FormControl('', Validators.required),
      segundonombreCtrl: new FormControl(''),
      primerapellidoCtrl: new FormControl('', Validators.required),
      segundoapellidoCtrl: new FormControl(''),
      sexoCtrl: new FormControl('', Validators.required),
      fechaCtrl: new FormControl('', Validators.required)
    });
    chekgroup.push(controle);

    let agregarMostrarCampo = false;

    this.mostrarOtroSexoMiembrosFamilia.push(agregarMostrarCampo);

    //console.log("CUANDO AGREGO NUEVO MIEMBRO LO QUE TENGO EN OTRO SEXO MIEMBROS ARRAY FAMILIA: ",this.mostrarOtroSexoMiembrosFamilia);

    // console.log('CHECK', chekgroup);
    // console.log('THIS--', this.fourFormGroup);

  }

// elimina miembro del hogar
  EliminarMiembro(index) {
    this.miembrosFamilia.removeAt(index);
    this.seleccionSexo(index);
    this.mostrarOtroSexoMiembrosFamilia.splice(index, 1);
    // console.log('DESPUES DE ELIMINAR', this.fourFormGroup);
  }

// funcion para cambiar de paso
  stepChange(e, stepper) {
    if (!this.error) { // si bandera error es false me deja guardar al pasar a otro step
      // console.log(e);
      // console.log('ERROR VALOR: ', this.error);
      if (e.previouslySelectedIndex == 0 || e.previouslySelectedIndex == 0 && this.id == null) {
        //  console.log('envio cuando es 0');
        this.enviarInfo(e.previouslySelectedStep.stepControl, 'paso' + (e.previouslySelectedIndex + 1), stepper, false, e.previouslySelectedIndex);
      } else if (e.previouslySelectedIndex != 0) {
        //  console.log('envio cuando es diferente 0');
        this.enviarInfo(e.previouslySelectedStep.stepControl, 'paso' + (e.previouslySelectedIndex + 1), stepper, false, e.previouslySelectedIndex);
      }
    } else { // cuando deja guardar info al pasar a otro step, esto para que no se ejecute 2 cuando oprimo boton siguiente y ejecuta next()
      this.error = false; // habilita la bandera para que se pueda pasar oprimienod en el cabezado del siguiente paso
    }
  }

// creo boton mati con parametros
  botonMati() {
    // console.log('EN BOTON MATI: ', this.id);
    this.mati.setAttribute('clientid', '5f91a78600ef73001be85cf4');
    this.mati.setAttribute('language', 'es');
    this.mati.setAttribute('metadata', JSON.stringify({'user_id': this.id}));
    document.getElementById('mati').appendChild(this.mati);
    this.mati.addEventListener('click', this.iniciaValidacion.bind(this));
    /*const mati = document.createElement('mati-button');mati-button
      mati.setAttribute("clientid", "5f91a78600ef73001be85cf4");
      mati.setAttribute("metadata", JSON.stringify({"user_id":this.id}));
      document.getElementById('mati').appendChild(mati);*/
  }

// Guardo información
  enviarInfo(grupo, paso, stepper: MatStepper, next: boolean, pasoquellama) {
    /* console.log('PASO PREVIO: ', pasoquellama);
     console.log('EL PASO ES: ', paso);
     console.log('EL GRUPO ES: ', grupo);
     console.log('EL next ES: ', next);*/
    let data = {
      'paso': paso,
      'infoencuesta': grupo.value,
      'autorizacion_id': this.autorizacion_actual
    };
    //  Guarda por primera vez, no se ha creado la encuesta, id es null
    if (this.id == null && data.paso == 'paso1') {
      //  console.log('VALOR DE ID ', this.id);
      this.formService.postForm(data).subscribe(res => {
        //   console.log('RESPUESTA: ', res);
        this.id = res;
        //console.log('doc', grupo.value.tipoDocumentoCtrl);
        if (grupo.value.tipoDocumentoCtrl != 'Indocumentado') {
          this.botonMati(); //  Llamo a función para agregar bloque botón mati
        }
        //this.infoencuesta = res; //  Toda la info de la encuesta
        this._snackBar.open('Información almacenada correctamente.', 'X', {
          duration: 2000
        });
        if (next) { // cuando oprimo boton "siguiente"
          this.error = true; // bandera para que no se ejecute stepChange al cambiar de step1 a step2
          //    console.log('PASO ASIGUIENTE?', this.error);
          stepper.next();
        }
      }, error => {
        //   console.log('GRUPO STATUS DESPUES:', grupo.status);
        //  console.log(stepper);
        if (!next) { // si cambie de step1 a step2 oprimiendo el encabezado llamando a stepChange
          this._snackBar.open('Error al almacenar información. Vuelva a intentarlo. #EPST' + paso, 'X', {
            duration: 2000,
          });
          stepper.previous();
        } else { // si oprimí siguiente
          this._snackBar.open('Error al almacenar información. Vuelva a intentarlo. #EPS' + paso, 'X', {
            duration: 2000
          });
        }
      });
    } else if (this.id == null && data.paso != 'paso1') { // Si intento ir a paso2 pero hubo error en paso1
      this._snackBar.open('Error al almacenar información. Vuelva a intentarlo. #E' + paso, 'X', {
        duration: 2000
      });
      stepper.selectedIndex = 1;
    } else if (this.id != null) {
      // cuando ya el formulario está creado y tengo el id, voy a actualizar cualquier paso
      //  console.log('VOY A ACTUALIZAR');
      if (data.paso == 'paso8') {
        // Determino la cantidad de miembros agregado, sumando 1 que es la persona que responde el formulario
        let cantidad_miembros = this.fourFormGroup.controls.miembrosFamilia.value.length + 1;
        data['infoencuesta']['cantidad_miembros'] = cantidad_miembros;
      }
      this.formService.updateForm(this.id, data).subscribe(res => {
        //this.infoencuesta = res;
        if (next) { // cuando selecciono botón siguiente
          this._snackBar.open('Información almacenada correctamente', 'X', {
            duration: 2000
          });
          this.error = true; // bandera para que no se ejecute el llamado a stepChange por cambiar de paso
          //  console.log('PASO ASIGUIENTE?');
          stepper.next();
        } else { // cuando selecciono el encabezado del siguiente paso directamente y se ejecuta stepChange
          this._snackBar.open('Información almacenada correctamente', 'X', {
            duration: 2000
          });
        }
      }, error => {
        this.error = true; // bandera para llamar solamente a stepChange para el paso en el que estaba inicialmente
        // bloquea el llamado del segundo step al que intento ir pero que me devuelve porq en el paso inicial hubo error
        if (!next) { // cuando cambio de step y llamo a stepChange
          this._snackBar.open('Error al almacenar información. Vuelva a intentarlo. #EEPST' + paso, 'X', {
            duration: 2000,
          });
          stepper.selectedIndex = pasoquellama; // paso en el que estoy antes de llamar al nuevo paso
        } else { // cuando se oprime botón siguiente
          this.error = false; // cuando oprimo siguiente no intenta pasar al siguiente step entonces habilito la  bandera
          // y cuando intente ir a otro paso oprimiendo el step, me permite intentar ir a ese step.
          this._snackBar.open('Error al almacenar información. Vuelva a intentarlo. #EEPS' + paso, 'X', {
            duration: 2000,
          });
        }
      });
    }
  }
}
