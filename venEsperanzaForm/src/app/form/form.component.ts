import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import {FormService} from '../services/form.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatStepper} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
//import { requiredFileType } from "./requireFileTypeValidators";
export interface Municipio {
  nombre: string;
}

@Component({
  selector: 'form-encuesta',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  unicafoto:any; //variable dinamica que va asignando cada foto seleccionada al miembro de hogar respectivo

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

  //variable jorge:
  lineacontactoAlternativaWhatsappInput = false;

  saving = false;


  otroNacionalidad = false;//agregadoJorge

  otroSexoEncuestado = false;

  mostrarOtroSexoMiembrosFamilia = []; // Array para definir true/false y mostrar campo otro sexo en cada miembro de familia agregado

  myDate = new Date(); // fecha actual para inhabilitar seleccion de fechas de nacimiento mayores a la actual

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

  //nuevos pasos Jorge:
  llegadaDestinoFormGroup: FormGroup;

  //nuevas listas Jorge:

  opcionesComoLlegoAlFormulario = [
    {name: 'Ví un pendón en un albergue', value: 'vi_un_pendon_en_un_albergue'},
    {name: 'Recibí un volante en un albergue', value:'recibi_un_volante_en_un_albergue'},
    {name: 'Recibí una foto con la información' ,value:'recibi_una_foto_con_la_informacion'},
    {name: 'Recibí el enlace por chat', value: 'recibi_el_enlace_por_chat'},
    {name: 'Encontré el enlace en Facebook', value: 'encontre_el_enlace_en_facebook'},
    {name: 'Una persona conocida me lo envió para que lo llenara', value:'una_persona_conocida_me_lo_envio_para_que_lo_llenara'},
    {name: 'Otro', value: 'otro'}
  ];

 

 

  listaFechasLlegadaPais = [
    {name: 'Menos de un mes', value: 'menos_de_un_mes'},
    {name: '1 - 2 meses', value: '1_2_meses'},
    {name: '2 - 3 meses', value:'2_3_meses'},
    {name: '3 - 6 meses', value:'3_6_meses'},
    {name: 'Más de 6 meses', value:'mas_de_6_meses'}

  ]

  listaRazonesElegirDestinoFinal = [
    {name: 'Algún amigo o familiar me espera', value: 'algun_amigo_familiar_me_espera'},
    {name: 'Conozco personas que me pueden dar trabajo', value: 'conozco_personas_que_me_pueden_dar_trabajo'},
    {name: 'He escuchado que puedo tener trabajo allá', value:'he_escuchado_que_puedo_tener_trabajo_alla'},
    {name: 'Otra', value:'otra'}
  ];

  dentroDeColombiaNO = false;
  dentroDeColombia = false;

  public autorizacionSeleccionada: number;

  nacionalidades = [
    {name: 'Colombiana'},
    {name: 'Venezolana'},
    {name: 'Colombo-venezolana'},
    {name: 'Otro'}
  ];

  tipoDocumentos = [
    {name: 'Acta de Nacimiento'},
    {name: 'Cédula de Identidad (venezonala)'},
    {name: 'Cédula de ciudadania (colombiana)'},
    {name: 'Pasaporte'},
    {name: 'Cédula de Extranjería'},
    {name: 'Indocumentado'},
    {name: 'Otro'}
  ];

  paisesLista = [
    {name: 'Antigua y Barbuda'},
    {name: 'Argentina'},
    {name: 'Bahamas'},
    {name: 'Barbados'},
    {name: 'Bolivia'},
    {name: 'Brasil'},
    {name: 'Chile'},
    {name: 'Colombia'},
    {name: 'Costa Rica'},
    {name: 'Cuba'},
    {name: 'Dominica'},
    {name: 'Ecuador'},
    {name: 'Granda'},
    {name: 'Guyana'},
    {name: 'Jamaica'},
    {name: 'México'},
    {name: 'Panamá'},
    {name: 'Perú'},
    {name: 'República Dominicana'},
    {name: 'Surinam'},
    {name: 'Trinidad y Tobago'},
    {name: 'Uruguay'},
    {name: 'Venezuela'}
  ]
  
  formasDeContactarte = [
    {name: 'Por llamada'},
    {name: 'WhastApp'},
    {name: 'Facebook'},
    {name: 'Correo electrónico'},
    {name: 'Otro'}
  ];

  municipiosListaCorta: Municipio[] = [
    {nombre: "BOCHALEMA"},
    {nombre: "BERLÍN"},
    {nombre: "BUCARAMANGA"},
    {nombre: "CÚCUTA"},
    {nombre: "PAMPLONA"},
    {nombre: "BOGOTÁ"},
    {nombre: "CALI"},
    {nombre: "PASTO"},
    {nombre: "MEDELLÍN"}
  ]; 

  filteredMunicipiosListaCorta: Observable<Municipio[]>;

  selectedMunicipioUbicacion = null;
  nuevo_municipio_ubicacion = true;


 

  departamentosList = [];
  municipiosList = [];
  municipiosFilter = [];
  barriosVillaRosarioList = []; // barrios villa del rosario
  necesidadesList = [];


// esto no se usa
  otrosmiembros = [
    {
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      sexo: '',
      fecha_nacimiento: ''

    }
  ];

  autorizacionActual = null;
  miembrosFamilia: any; // variable que se le asigna al grupo familiar
  error = false; // bandera para no intentar guardar 2 veces al hacer click en siguiente de cada paso
  referrer: any = document.referrer; // origen del trafico
  queryString: any = window.location.search; // obtener url
  form: any = false; // debe ser false y habilitar el if de validar referrer

  coordenadas = null;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(private formBuilder: FormBuilder, private formService: FormService,
              private snackBar: MatSnackBar, private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    const urlParams = new URLSearchParams(this.queryString);  // url
    const isv = urlParams.get('isv'); // parametro isv
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = {latitud: position.coords.latitude, longitud: position.coords.longitude};

      //coordenadas global para guardar en autorizacion
      this.coordenadas = coords;

      const datos = {coordenadas: coords, adf: isv, ref: this.referrer};
      this.formService.validateUser(datos).subscribe(res => {
        this.form = 1;
      }, error => {
        // console.log('error', error);
        this.form = 1;
      });
    }, error => {
      this.form = 1;
    }, {timeout: 8000});

    this.formService.Login().subscribe(res => {

      this.formService.setLocal(res, false);
      this.formService.getDepartamentos()
        .subscribe((data: any[]) => {
          this.departamentosList = data;
        });

      this.formService.getMunicipios()
        .subscribe((data: any[]) => {
          this.municipiosList = data;
          this.municipiosFilter = this.municipiosList;
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

    //nuevos formgroup
    this.llegadaDestinoFormGroup = this.formBuilder.group({
      comoLlegoAlFormularioCtrl: ['', Validators.required],
      llegadaDestinofechaLlegadaCtrl: ['', Validators.required],
      //llegadaDestinoPlaneaEstarEnColombiaCtrl: ['', Validators.required],
      //llegadaDestinoDestinoFinalFueraColombiaCtrl: ['', Validators.required],
      llegadaDestinoDepartamentoCtrl: ['', Validators.required],
      //llegadaDestinoCiudadCtrl:['', Validators.required],
      //razonElegirDestinoFinalCtrl: ['', Validators.required],
      //hogarRecibeTransporteHumanitarioCtrl:['',Validators.required],
      
      firstNameCtrl: ['', Validators.required],
      secondNameCtrl: [''],
      lastNameCtrl: ['', Validators.required],
      secondLastNameCtrl: [''],
      //sexoCtrl: ['', Validators.required],
      //fechaNacimientoCtrl: ['', Validators.required],
      //nacionalidadCtrl: ['', Validators.required],
      tipoDocumentoCtrl: ['', Validators.required],
      numeroDocumentoCtrl: ['', [Validators.required, Validators.min(100)]],
      //compartirFotoDocumentoEncuestadoCtrl: new FormControl('', Validators.required), 
      numeroContactoCtrl: ['', Validators.required],
      numeroEntregadoVenEsperanzaCtrl: ['', Validators.required],
      lineaContactoPropiaCtrl: ['', Validators.required],
      lineaContactoAsociadaAWhatsappCtrl: ['', Validators.required],
      correoCtrl: ['', Validators.required]

    });

    // crea los formsGroup
    this.secondFormGroup = this.formBuilder.group({
      firstNameCtrl: ['', Validators.required],
      secondNameCtrl: [''],
      lastNameCtrl: ['', Validators.required],
      secondLastNameCtrl: [''],
      sexoCtrl: ['', Validators.required],
      fechaNacimientoCtrl: ['', Validators.required],
      nacionalidadCtrl: ['', Validators.required],
      tipoDocumentoCtrl: ['', Validators.required],
      numeroDocumentoCtrl: ['', [Validators.required, Validators.min(10)]]
    });


    this.thirdFormGroup = this.formBuilder.group({

      //departamentoCtrl: ['', Validators.required],
      //municipioCtrl: ['', Validators.required],
      ubicacionCtrl: ['', Validators.required],
      //nuevoMunicipioUbicacionCtrl: ['', Validators.required],
      /*barrioCtrl: ['', Validators.required],
      direccionCtrl: [''],*/
      numeroEntregadoVenEsperanzaCtrl: ['', Validators.required],
      numeroContactoCtrl: ['', [Validators.required, Validators.min(1000000), Validators.max(9999999999)]],
      lineaContactoPropiaCtrl: ['', Validators.required],
      lineaContactoAsociadaAWhatsappCtrl: [''],
      contactoAlternativoCtrl: ['', [Validators.min(1000000),
          Validators.max(9999999999)]], 
      lineaContactoAlternativoCtrl:[''], //verificar
      lineaContactoAlternativoAsociadaAWhatsappCtrl: [''],
      correoCtrl: [''],
      tieneCuentaFacebook: [''],
      podemosContactarte: [''],
      comentarioAdicionalCtrl: ['']
    });


    this.fourFormGroup = this.formBuilder.group({
      unicoMiembro: [''],
      totalMiembrosHogar: ['', Validators.required],
      miembrosFamilia: new FormArray([])

    });

    // asigna a la variable global de miembrosFamilia el controlador de tipo array
    this.miembrosFamilia = this.fourFormGroup.get('miembrosFamilia') as FormArray;


    this.fiveFormGroup = this.formBuilder.group({
      mujeresEmbarazadasCtrl: [''],
      mujeresLactantesCtrl: [''],
      personasDiscapacidadCtrl: [''],
      personasEnfermedadesCronicasCtrl: ['']
    });


    this.sixFormGroup = this.formBuilder.group({
      alimentos11Ctrl: [''],
      alimentos12Ctrl: [''],
      alimentos13Ctrl: [''],
      alimentos14Ctrl: [''],
      alimentos15Ctrl: [''],
      alimentos16Ctrl: ['']


    });
    this.sevenFormGroup = this.formBuilder.group({
      necesidades17Ctrl: ['', Validators.required],
      necesidades22Ctrl: this.formBuilder.array([], Validators.required)
    });


    this.eightFormGroup = this.formBuilder.group({
      alojamientoViviendaCtrl: [''],
    });

    this.nineFormGroup = this.formBuilder.group({
      economicoCtrl: [''],
      gastoHogarCtrl: [''],
      gastoHogar7diasCtrl: ['']
    });

    this.tenFormGroup = this.formBuilder.group({
      tenCtrl: ['', Validators.required]
    });

      //filtro municipios DATOS CONTACTO
      this.filteredMunicipiosListaCorta = this.thirdFormGroup.controls.ubicacionCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(nombre => nombre ? this._filter(nombre) : this.municipiosListaCorta.slice())
      );
            
  }

  //funcion muestra municipio en mat-autocomplete 
  displayFn(municipio: Municipio): string {
    //console.log('MUNICIPIO DISPLAY FN: ', municipio);
    return municipio && municipio.nombre ? municipio.nombre : '';
  }

  //filtro mat-autocomplete 
  private _filter(name: string): Municipio[] {

    //console.log('FILTERVALUE NAME:: ', name);
    const filterValue = name.toLowerCase();

    //return this.municipiosListaCorta.filter(option => option.nombre.toLowerCase().includes(filterValue));
    let valores = this.municipiosListaCorta.filter(option => option.nombre.toLowerCase().includes(filterValue));
    //console.log('VALORES FILTRADOS: ', valores);
    return valores;

  }

  selectMunicipio(event){
    /*
    //console.log('OPTION SELECCIONADA: ', option);
    console.log('ENTRA A SELECT MUNICIPIO: ', this.thirdFormGroup.controls.ubicacionCtrl);
    if (this.thirdFormGroup.controls.ubicacionCtrl.value != "") {
      console.log('ENTRA A NUEVO MUNICIPIO? ');
      this.thirdFormGroup.controls['nuevoMunicipioUbicacionCtrl'].clearValidators();
      this.thirdFormGroup.controls['nuevoMunicipioUbicacionCtrl'].updateValueAndValidity();

      console.log('THIRD FORM NUEVO MUNI: ', this.thirdFormGroup.controls['nuevoMunicipioUbicacionCtrl']);
      //this.thirdFormGroup.removeControl('nuevoMunicipioUbicacionCtrl');
       //setControl('nuevoMunicipioUbicacionCtrl', new FormControl('')); 

    }else if(!this.thirdFormGroup.contains('nuevoMunicipioUbicacionCtrl')){
      console.log('ENTRA A EL THIRDFORM NO CONTIENE NUEVOMUNICPIO');
      this.thirdFormGroup.addControl('nuevoMunicipioUbicacionCtrl',new FormControl('', Validators.required));
    }else{
      console.log('ENTR A SET VALIDATORS REQUIRED de NUEVO MUNI');
      this.thirdFormGroup.controls['nuevoMunicipioUbicacionCtrl'].setValidators(Validators.required);
    }

    //console.log('OPTION1: ', event.option);
    //console.log('OPTION2: ', event.option.value);
    console.log('OPTION3: ', event.option.value.nombre);

    console.log('TERCER FORM: ', this.thirdFormGroup.controls.ubicacionCtrl.value['nombre']);
    if (event.option.value.nombre === "Otro") {
     //if(this.thirdFormGroup.controls.ubicacionCtrl.value['nombre'] === "Otro"){
       console.log('ENTRA A OTRO?');
      //this.thirdFormGroup.controls.ubicacionCtrl.setValue(option);
      this.thirdFormGroup.addControl('ubicacionOtroCtrl', new FormControl('', Validators.required));

    }else if(event.option.value.nombre !== "Otro" && this.thirdFormGroup.contains('ubicacionOtroCtrl')){
      
      this.thirdFormGroup.removeControl('ubicacionOtroCtrl');

    }*/

    
  }

/*
  validarNuevaUbicacion() {
    if (this.thirdFormGroup.controls.nuevoMunicipioUbicacionCtrl.value !== '') {
    
        this.thirdFormGroup.removeControl('ubicacionCtrl');
        //this.thirdFormGroup.removeControl('ubicacionOtroCtrl');      
      
    }else{
       
      //this.thirdFormGroup.setControl('nuevoMunicipioUbicacionCtrl', new FormControl('')); 
      this.thirdFormGroup.addControl('ubicacionCtrl', new FormControl('',Validators.required));

      this.filteredMunicipiosListaCorta = this.thirdFormGroup.controls.ubicacionCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(nombre => nombre ? this._filter(nombre) : this.municipiosListaCorta.slice())
      );
    }

    //console.log('EN VALIDAR NUEVA UBI: ', )
  }*/

// Primer paso aceptar terminos
  termsAccept($event: any): void {
    this.termnsandconditions = false;
    this.quentionaccepttermns = false;
    this.titleheader = false;
    if ($event == false) {
      this.formPrincipal = false;
      this.finishmessage = true;
    } else if ($event == true) {
      //console.log('COORDENADAS: ', this.coordenadas);
      const datosAceptarCondiciones = {
        tratamientoDatos: true,
        terminosCondiciones: true,
        condiciones: true,
        coordenadas: this.coordenadas //envia coordenadas ubicacion actual
      };
      
      this.formService.crearAutorizacion(datosAceptarCondiciones).subscribe(res => {

        if (res) {
          this.autorizacionActual = res;
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
  selectTipoDocumento($event: any): void {
    if ($event.value == 'Otro') { // si es Otro agrega el controlador
      this.otroTipoDocumento = true;
      //this.secondFormGroup.addControl('otroTipoDocumentoCtrl', new FormControl('', Validators.required));
      this.llegadaDestinoFormGroup.addControl('otroTipoDocumentoCtrl', new FormControl('',Validators.required));
    } else if ($event.value != 'Otro' && this.llegadaDestinoFormGroup.contains('otroTipoDocumentoCtrl')) {
      // si es diferente de Otro y ya contien otro, elimina el controlador de Otro
      this.otroTipoDocumento = false;
      //this.secondFormGroup.removeControl('otroTipoDocumentoCtrl');
      this.llegadaDestinoFormGroup.removeControl('otroTipoDocumentoCtrl');
    }
    if ($event.value == 'Indocumentado') { // Si es indocumentado elimina controlador de numero documento
      //this.secondFormGroup.removeControl('numeroDocumentoCtrl');
      this.llegadaDestinoFormGroup.removeControl('numeroDocumentoCtrl');
      this.numeroDocumento = false;
    //} else if ($event.value != 'Indocumentado' && !this.secondFormGroup.contains('numeroDocumentoCtrl')) {
    } else if ($event.value != 'Indocumentado' && !this.llegadaDestinoFormGroup.contains('numeroDocumentoCtrl')) {
      // si es diferente a indocumentado y el formgroup no contiene numerodocumento, crea el controlador de numero documento
      //this.secondFormGroup.addControl('numeroDocumentoCtrl', new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10) ]));
      this.llegadaDestinoFormGroup.addControl('numeroDocumentoCtrl', new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10) ]));

      this.numeroDocumento = true;
    }
  }

  selectNacionalidad($event:any):void{
    /*
    console.log('SELECT NACIONALIDAD MIEMBRO: ');
    console.log('EVENTO: ', $event);
    console.log('INDEX MIEMBRO: ', index);
    console.log('MIEMBOR SFAMILIA: ',this.fourFormGroup.controls.miembrosFamilia);*/

    if ($event.value == 'Otro') { // si es Otro agrega el controlador

      //console.log('MIEMBRO FAMILIA EN OTRO NACIONALIDAD ', this.fourFormGroup.controls.miembrosFamilia['controls'][index] );
      this.llegadaDestinoFormGroup.addControl('otroNacionalidadCtrl', new FormControl('', Validators.required));
    } else if ($event.value != 'Otro' && this.llegadaDestinoFormGroup.contains('otroNacionalidadCtrl')) {
      // si es diferente de Otro y ya contien otro, elimina el controlador de Otro

      //console.log('MIEMBRO FAMILIA NACIONALIDAD DIFERENTE A OTRO: ', this.fourFormGroup.controls.miembrosFamilia['controls'][index] );
      this.llegadaDestinoFormGroup.removeControl('otroNacionalidadCtrl');
    }

  }

// selecciona departamento y filtra lso municipios
  selectDepartamento($event: any): void {
    this.municipiosFilter = this.municipiosList;
    const municipiosnuevo = this.municipiosList.filter(muni => muni.id_departamento == $event.value);
    this.municipiosFilter = municipiosnuevo;
    this.thirdFormGroup.controls.municipioCtrl.setValue(null);
  }

  compartirFotoDocumentoEncuestado($event){

    //console.log('EVENTO FOTO: ', $event.value);
     if($event.value == 1){
      //this.fourFormGroup.controls.miembrosFamilia['controls'][index].addControl('fotoDocumentoCtrl', 
     // new FormControl('', [Validators.required, requiredFileType(["jpg", "png", "txt"])]));

     this.llegadaDestinoFormGroup.addControl('fotoDocumentoEncuestadoCtrl', 
      new FormControl('', [Validators.required]));
      
      
     }else if($event.value ==0){
      this.llegadaDestinoFormGroup.removeControl('fotoDocumentoEncuestadoCtrl');
     }

  }


  subirArchivoEncuestado($event):void{
    //console.log('INDEX: ', this.fourFormGroup.controls.miembrosFamilia['controls'][index]);
    //console.log('EVENTO: ', $event);
    //console.log('EVENTO TARGET: ', $event.target.files);
    let elemento = $event.target.files[0]; //tomo la foto seleccionada

    this.unicafoto = $event.target.files[0];
    
    this.llegadaDestinoFormGroup.controls.fotoDocumentoEncuestadoCtrl.setValue(elemento);

    //console.log('ARCHIVO: ', this.fourFormGroup.controls.miembrosFamilia['controls'][index]);

    //Funcionalidad que asigna el archivo seleccionado a variable dinamica this.unicafoto y la relaciona con 
    //el campo fotoDocumentoCtrl del miembro de hogar respectivo
      var files = $event.target.files;
      var file = files[0];
      this.unicafoto.nombreArchivo = file.name;
      this.unicafoto.tipo = file.type;
  
      if(files && file) {
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
      }
    

  }

  
  numeroEntregadoVenEsperanza($event:any):void{

    //console.log('LA SELECCION DE NUMEOR VENESPE SI_NO: ', $event);
    //console.log('VALOR DEL CONTROLADOR: ', this.thirdFormGroup.controls.numeroEntregadoVenEsperanzaCtrl);
  }

// validacion de linea de contacto propia, muestra o oculta los campos segun la seleccion
  lineaContactoPropia($event: any): void {
    //console.log('LINEA CONTACTO: ', this.thirdFormGroup);
    /*if ($event.value === 'si') { // si la linea de contacto es propia, oculta contacto alternativo y muestra linea whatsapp
      //this.contactoAlternativoInput = false;
      this.lineacontactoWhatsappInput = true;
      //this.lineacontactoAlternativaWhatsappInput = false;
      // crea controlador de lineacontactowhatsapp
      this.thirdFormGroup.addControl('lineaContactoAsociadaAWhatsappCtrl', new FormControl('',
        [Validators.required, Validators.min(1000000), Validators.max(9999999999)]));
      if (this.thirdFormGroup.contains('contactoAlternativoCtrl')) {
        // elimina controlador si existe
       // this.thirdFormGroup.removeControl('contactoAlternativoCtrl');

        //this.thirdFormGroup.removeControl('lineaContactoAlternativoCtrl');

        if(this.thirdFormGroup.contains('lineaContactoAlternativoAsociadaAWhatsappCtrl')){
          this.thirdFormGroup.removeControl('lineaContactoAlternativoAsociadaAWhatsappCtrl');
         }
      }
    } else if ($event.value === 'no') { // si linea de contacto no es propia
      this.contactoAlternativoInput = true;  // muestra contacto alternativo
      this.lineacontactoWhatsappInput = false; // oculta linea contacto whatsapp
      this.thirdFormGroup.addControl('contactoAlternativoCtrl',
        new FormControl('', [Validators.required, Validators.min(1000000),
          Validators.max(9999999999)])); // crea controlador para contactoalternativo

          this.thirdFormGroup.addControl('lineaContactoAlternativoCtrl',
          new FormControl('', [Validators.required])); // crea controlador para lineaContactoAlternativoCtrl

      if (this.thirdFormGroup.contains('contactoAlternativoCtrl')) { // si ya existe contacto alternativo elimina linea whatsapp
        this.thirdFormGroup.removeControl('lineaContactoAsociadaAWhatsappCtrl');
      }
    }*/
  }


  lineaContactoPropiaAsociadaWhatsapp($event:any):void{

    //si la linea de contacto propia no esta asociada a Whatsapp agrega numerowhatsapp al controlador
    //console.log('EVENTO LINEA CONTACTO PROPIA WHATSAPP: ', $event.value);
    if($event.value === 'no'){
      this.thirdFormGroup.addControl('numeroWhatsappCtrl', new FormControl('',
        [Validators.required, Validators.min(1000000), Validators.max(9999999999)]));
    }else if($event.value === 'si'){

      if (this.thirdFormGroup.contains('numeroWhatsappCtrl')) { // si ya existe contacto alternativo elimina linea whatsapp
        this.thirdFormGroup.removeControl('numeroWhatsappCtrl');
      }
    }
  }

  //nueva funcion jorge:
  lineaContactoAlternativo($event: any): void{
    /*
    if ($event.value === 'si') { // si la linea de contacto es propia, oculta contacto alternativo y muestra linea whatsapp
      //his.contactoAlternativoInput = false;
      this.lineacontactoAlternativaWhatsappInput = true;
      // crea controlador de lineacontactowhatsapp
      this.thirdFormGroup.addControl('lineaContactoAlternativoAsociadaAWhatsappCtrl', new FormControl('',
        [Validators.required, Validators.min(1000000), Validators.max(9999999999)]));
       //if (this.thirdFormGroup.contains('contactoAlternativoCtrl')) {
        // elimina controlador si existe
        //this.thirdFormGroup.removeControl('contactoAlternativoCtrl');

        //this.thirdFormGroup.removeControl('lineaContactoAlternativoCtrl');
      //}
    } else if ($event.value === 'no') { // si linea de contacto no es propia
      //this.contactoAlternativoInput = true;  // muestra contacto alternativo
      this.lineacontactoAlternativaWhatsappInput = false; // oculta linea contacto whatsapp
      //this.thirdFormGroup.addControl('contactoAlternativoCtrl',
       // new FormControl('', [Validators.required, Validators.min(1000000),
       //   Validators.max(9999999999)])); // crea controlador para contactoalternativo

       //   this.thirdFormGroup.addControl('lineaContactoAlternativoCtrl',
       //   new FormControl('', [Validators.required])); // crea controlador para lineaContactoAlternativoCtrl
      //

      if (this.thirdFormGroup.contains('lineaContactoAlternativoAsociadaAWhatsappCtrl')) { // si ya existe contacto alternativo elimina linea whatsapp
        this.thirdFormGroup.removeControl('lineaContactoAlternativoAsociadaAWhatsappCtrl');
      }
    }
    //console.log('THIRD FORM GROUP CONTACTO ALTERNATIVO: ', this.thirdFormGroup);
    */
  }

  tieneCuentaFacebook($event:any):void{

    if($event.value === "si"){
      this.thirdFormGroup.addControl('cuentaFacebookCtrl', new FormControl(''));
    }else if($event.value === 'no'){
      this.thirdFormGroup.removeControl('cuentaFacebookCtrl');
    }
  }

  podemosContactarte($event:any):void{
    if($event.value === "si"){
      this.thirdFormGroup.addControl('formaContactarteCtrl', new FormControl(''));
    }else if($event.value === "no"){
      this.thirdFormGroup.removeControl('formaContactarteCtrl');

    }
  }

  selectFormaContactarte($event:any):void{
    if($event.value === "Otro"){
      this.thirdFormGroup.addControl('otraFormaContactarteCtrl', new FormControl(''));
    }else{
      this.thirdFormGroup.removeControl('otraFormaContactarteCtrl');

    }

    //console.log('THIRD FOM EN FORMA CONTACTO: ', this.thirdFormGroup);
  }

// validacion de seleccion si es mujer
  seleccionSexo(posicion): void {
    let muj = false;
    this.fourFormGroup.controls.miembrosFamilia.value.forEach(item => {
      muj = (muj || item.sexoCtrl === 'mujer');
    });
    //this.mujeres = (muj || this.secondFormGroup.value.sexoCtrl === 'mujer');
    this.mujeres = (muj || this.llegadaDestinoFormGroup.value.sexoCtrl === 'mujer');
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

  finalizar(): void {
    this.titleheader = false;
    this.formPrincipal = false;
    this.thanksmessage = true;
  }

// Agrega miembro del hogar
  agregarNuevoMiembro(): void {
    // Crea un form array de los controles del miembro familiar y agrega un formgroup para cada nuevo miembro
    const chekgroup: FormArray = this.fourFormGroup.controls.miembrosFamilia as FormArray;
    const controle = new FormGroup({
      primernombreCtrl: new FormControl('', Validators.required),
      segundonombreCtrl: new FormControl(''),
      primerapellidoCtrl: new FormControl('', Validators.required),
      segundoapellidoCtrl: new FormControl(''),
      sexoCtrl: new FormControl('', Validators.required),
      fechaCtrl: new FormControl('', Validators.required),
      nacionalidadCtrl: new FormControl('', Validators.required),
      tipoDocumentoCtrl: new FormControl('', Validators.required),
      //numeroDocumentoCtrl: new FormControl ('', [Validators.required, Validators.min(1), Validators.max(9999999999)]),
      numeroDocumentoCtrl: new FormControl ('', [Validators.required, Validators.minLength(3),Validators.maxLength(10)]),

      compartirFotoDocumentoCtrl: new FormControl('', Validators.required), 
      //fotoDocumentoCtrl: new FormControl('',Validators.required)

    });
    chekgroup.push(controle);
    this.mostrarOtroSexoMiembrosFamilia.push(false);

   //console.log('MIEMBROS FAMILIA : ', this.fourFormGroup);
  }

// elimina miembro del hogar
  EliminarMiembro(index): void {
    this.miembrosFamilia.removeAt(index);
    this.seleccionSexo(index);
    this.mostrarOtroSexoMiembrosFamilia.splice(index, 1);
  }

  //seleccion nacionalidad miembro
  selectNacionalidadMiembro($event:any,index):void{
    /*
    console.log('SELECT NACIONALIDAD MIEMBRO: ');
    console.log('EVENTO: ', $event);
    console.log('INDEX MIEMBRO: ', index);
    console.log('MIEMBOR SFAMILIA: ',this.fourFormGroup.controls.miembrosFamilia);*/

    if ($event.value == 'Otro') { // si es Otro agrega el controlador

      //console.log('MIEMBRO FAMILIA EN OTRO NACIONALIDAD ', this.fourFormGroup.controls.miembrosFamilia['controls'][index] );
      this.fourFormGroup.controls.miembrosFamilia['controls'][index].addControl('otroNacionalidadCtrl', new FormControl('', Validators.required));
    } else if ($event.value != 'Otro' && this.fourFormGroup.controls.miembrosFamilia['controls'][index].contains('otroNacionalidadCtrl')) {
      // si es diferente de Otro y ya contien otro, elimina el controlador de Otro

      //console.log('MIEMBRO FAMILIA NACIONALIDAD DIFERENTE A OTRO: ', this.fourFormGroup.controls.miembrosFamilia['controls'][index] );
      this.fourFormGroup.controls.miembrosFamilia['controls'][index].removeControl('otroNacionalidadCtrl');
    }

  }

  //seleccion tipodocumento miembro
  selectTipoDocumentoMiembro($event: any,index): void {

    /*
    console.log('SELECT TIPO DOCUMENTO MIEMBRO: ');
    console.log('$event: ', $event);
    console.log('INDEX: ', index);
    console.log('MIEMBOR SFAMILIA: ',this.fourFormGroup.controls.miembrosFamilia);*/

    if ($event.value == 'Otro') { // si es Otro agrega el controlador

      //this.otroTipoDocumento = true;
      //console.log('MIEMBRO FAMILIA EN OTRO TIPO DOCUMENTO: ', this.fourFormGroup.controls.miembrosFamilia['controls'][index] );
      this.fourFormGroup.controls.miembrosFamilia['controls'][index].addControl('otroTipoDocumentoCtrl', new FormControl('', Validators.required));
    } else if ($event.value != 'Otro' && this.fourFormGroup.controls.miembrosFamilia['controls'][index].contains('otroTipoDocumentoCtrl')) {
      // si es diferente de Otro y ya contien otro, elimina el controlador de Otro
      //console.log('MIEMBRO FAMILIA TIPO DOCUMENTO DIFERENTE A OTRO: ', this.fourFormGroup.controls.miembrosFamilia['controls'][index] );
      //this.otroTipoDocumento = false;
      this.fourFormGroup.controls.miembrosFamilia['controls'][index].removeControl('otroTipoDocumentoCtrl');
    }

    if ($event.value == 'Indocumentado') { // Si es indocumentado elimina controlador de numero documento

      this.fourFormGroup.controls.miembrosFamilia['controls'][index].removeControl('numeroDocumentoCtrl');

      this.fourFormGroup.controls.miembrosFamilia['controls'][index].removeControl('compartirFotoDocumentoCtrl');

      this.fourFormGroup.controls.miembrosFamilia['controls'][index].removeControl('fotoDocumentoCtrl');

      //this.secondFormGroup.removeControl('numeroDocumentoCtrl');
      //console.log('MIEMBRO FAMILIA INDOCUMENTADO: ', this.fourFormGroup.controls.miembrosFamilia['controls'][index] );
      //this.numeroDocumento = false;
    }
     if ($event.value != 'Indocumentado' && !this.fourFormGroup.controls.miembrosFamilia['controls'][index].contains('numeroDocumentoCtrl')) {
      // si es diferente a indocumentado y el formgroup no contiene numerodocumento, crea el controlador de numero documento

      //this.fourFormGroup.controls.miembrosFamilia['controls'][index].addControl('numeroDocumentoCtrl', new FormControl('', [Validators.required, Validators.min(1), Validators.max(9999999999)]));
      this.fourFormGroup.controls.miembrosFamilia['controls'][index].addControl('numeroDocumentoCtrl', new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]));
      //this.secondFormGroup.addControl('numeroDocumentoCtrl', new FormControl('', [Validators.required, Validators.min(100)]));
      //this.numeroDocumento = true;
      //console.log('MIEMBRO DIFERENTE A INDOCUMENTADO Y CONTIENE NUMERODOCUMENTO: ', this.fourFormGroup.controls.miembrosFamilia['controls'][index] );

    }

    if ($event.value != 'Indocumentado' && !this.fourFormGroup.controls.miembrosFamilia['controls'][index].contains('compartirFotoDocumentoCtrl')) {
      // si es diferente a indocumentado y el formgroup no contiene numerodocumento, crea el controlador de numero documento

      this.fourFormGroup.controls.miembrosFamilia['controls'][index].addControl('compartirFotoDocumentoCtrl', new FormControl('', Validators.required));
      //this.secondFormGroup.addControl('numeroDocumentoCtrl', new FormControl('', [Validators.required, Validators.min(100)]));
      //this.numeroDocumento = true;
      //console.log('MIEMBRO DIFERENTE A INDOCUMENTADO Y CONTIENE NUMERODOCUMENTO: ', this.fourFormGroup.controls.miembrosFamilia['controls'][index] );

    }
  }


  compartirFotoDocumento($event,index){

    //console.log('EVENTO FOTO: ', $event.value);
     if($event.value == 1){
      //this.fourFormGroup.controls.miembrosFamilia['controls'][index].addControl('fotoDocumentoCtrl', 
     // new FormControl('', [Validators.required, requiredFileType(["jpg", "png", "txt"])]));

     this.fourFormGroup.controls.miembrosFamilia['controls'][index].addControl('fotoDocumentoCtrl', 
      new FormControl('', [Validators.required]));
      
      
     }else if($event.value ==0){
      this.fourFormGroup.controls.miembrosFamilia['controls'][index].removeControl('fotoDocumentoCtrl');
     }

  }


  subirArchivo($event,index):void{
    //console.log('INDEX: ', this.fourFormGroup.controls.miembrosFamilia['controls'][index]);
    //console.log('EVENTO: ', $event);
    //console.log('EVENTO TARGET: ', $event.target.files);
    let elemento = $event.target.files[0]; //tomo la foto seleccionada

    this.unicafoto = $event.target.files[0];
    
    this.fourFormGroup.controls.miembrosFamilia['controls'][index].controls.fotoDocumentoCtrl.setValue(elemento);

    //console.log('ARCHIVO: ', this.fourFormGroup.controls.miembrosFamilia['controls'][index]);

    //Funcionalidad que asigna el archivo seleccionado a variable dinamica this.unicafoto y la relaciona con 
    //el campo fotoDocumentoCtrl del miembro de hogar respectivo
      var files = $event.target.files;
      var file = files[0];
      this.unicafoto.nombreArchivo = file.name;
      this.unicafoto.tipo = file.type;
  
      if(files && file) {
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
      }
    

  }

  _handleReaderLoaded(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.unicafoto.base64textString = btoa(binaryString);
  }


  //compartir

// funcion para cambiar de paso
  stepChange(e, stepper): void {
    if (this.saving) {
      return;
    }
    if (!this.error) { // si bandera error es false me deja guardar al pasar a otro step
      if (e.previouslySelectedIndex == 0 || e.previouslySelectedIndex == 0 && this.id == null) {
        this.enviarInfo(e.previouslySelectedStep.stepControl,
          'paso' + (e.previouslySelectedIndex + 1), stepper, false,
          e.previouslySelectedIndex, false);
      } else if (e.previouslySelectedIndex != 0) {
        this.enviarInfo(e.previouslySelectedStep.stepControl,
          'paso' + (e.previouslySelectedIndex + 1), stepper, false,
          e.previouslySelectedIndex, false);
      }
    } else { // cuando deja guardar info al pasar a otro step, esto para que no se ejecute 2 cuando oprimo boton siguiente y ejecuta next()
      this.error = false; // habilita la bandera para que se pueda pasar oprimienod en el cabezado del siguiente paso
    }
  }

  //nuevas funciones Jorge:

  //como encontraste el formulario:
  comoLlegoAlFormulario($event:any):void{
    //console.log('COMO LLEGO AL FORM: ', $event);
    if($event.value == 'Otro'){
        this.llegadaDestinoFormGroup.addControl('dondeEncontroFormularioCtrl', new FormControl('', [Validators.required]));
        

        //console.log('LLEGADA DESTINO FORM: ', this.llegadaDestinoFormGroup);
    }else{

      this.llegadaDestinoFormGroup.removeControl('dondeEncontroFormularioCtrl');

    }
  }

    
  planeaEstarEnColombia($event:any):void{
    //console.log('SELECCION PLANEA ESTAR EN COLOMBIA: ',$event);
    if($event.value == 0){ //si selecciona NO planea estar en colombia
        this.dentroDeColombiaNO =true;
        this.dentroDeColombia = false;

        //valida si existe el controlador llegadaDestinoDestinoFinalFueraColombiaCtrl no existe, para crearlo
        this.llegadaDestinoFormGroup.addControl('llegadaDestinoDestinoFinalFueraColombiaCtrl', new FormControl('', [Validators.required]));

        //valida si existe el controlador llegadaDestinoDepartamentoCtrl, si existe lo elimina
        if(this.llegadaDestinoFormGroup.contains('llegadaDestinoDepartamentoCtrl')){
          this.llegadaDestinoFormGroup.removeControl('llegadaDestinoDepartamentoCtrl');
        }

        //valida si existe el controlador llegadaDestinoCiudadCtrl, si existe lo elimina
        if(this.llegadaDestinoFormGroup.contains('llegadaDestinoCiudadCtrl')){
          this.llegadaDestinoFormGroup.removeControl('llegadaDestinoCiudadCtrl');
        }
        //console.log('LLEGADA FORMGROUP NO PLANEA ESTAR EN COLOMBIA',this.llegadaDestinoFormGroup)

    }else{//si selecciona SI planea estar en colombia
      this.dentroDeColombiaNO = false;
      this.dentroDeColombia = true;

      //valida si controlador llegadaDestinoDestinoFinalFueraColombiaCtrl existe, para eliminarlo
      if(this.llegadaDestinoFormGroup.contains('llegadaDestinoDestinoFinalFueraColombiaCtrl')){
        this.llegadaDestinoFormGroup.removeControl('llegadaDestinoDestinoFinalFueraColombiaCtrl');
      }

      //valida si controlador llegadaDestinoDepartamentoCtrl no existe, para crearlo
      if(!this.llegadaDestinoFormGroup.contains('llegadaDestinoDepartamentoCtrl')){
        this.llegadaDestinoFormGroup.addControl('llegadaDestinoDepartamentoCtrl', new FormControl('', [Validators.required]));
      }

     // console.log('LLEGADA FORMGROUP SI PLANEA ESTAR EN COLOMBIA',this.llegadaDestinoFormGroup)
    }
  }

  selectDepartamentoLlegadaDestino($event:any):void{

    //console.log('SELECCION DEPARTAMENTO: ', $event.value);
    if($event.value != 'nodefinido'){ //selecciona algun departamento

        //console.log('DEPARTAMENTO SELECCIONADO DEFINIDO DEBE MOSTRAR CIUDAD');

        /*
        if(!this.llegadaDestinoFormGroup.contains('llegadaDestinoCiudadCtrl')){ //valida si controlador llegadaDestinoCiudadCtrl no existe, lo crea
          this.llegadaDestinoFormGroup.addControl('llegadaDestinoCiudadCtrl', new FormControl('', [Validators.required]));

        }*/

        this.municipiosFilter = this.municipiosList;
        const municipiosnuevo = this.municipiosList.filter(muni => muni.id_departamento == $event.value);
        this.municipiosFilter = municipiosnuevo;
        //console.log('MUNICIPIOS FILTRADOS: ', this.municipiosFilter);
        
        //this.llegadaDestinoFormGroup.controls.llegadaDestinoCiudadCtrl.setValue(null);


    }else{ //selecciona nodefinido, ya no puede seleccionar ciudad
       //console.log('NO DEFINIDO DEBE OCULTAR CIUDAD');
        if(this.llegadaDestinoFormGroup.contains('llegadaDestinoCiudadCtrl')){ //si contiene controlador Ciudad, lo elimina
          this.llegadaDestinoFormGroup.removeControl('llegadaDestinoCiudadCtrl');
        }
      /*console.log('NO DEFINIDO DEBE OCULTAR CIUDAD');
      this.llegadaDestinoFormGroup.controls.llegadaDestinoCiudadCtrl.setValue('');
      this.llegadaDestinoFormGroup.controls.llegadaDestinoCiudadCtrl.clearValidators();
      console.log('LLEGADA A DESTINO FORM GROUP DESPUES DE SET VALUE vacio: ',this.llegadaDestinoFormGroup);*/
    }

  }

  selectCiudadLlegadaDestino($event:any):void{
   // console.log('SELECCION MUNICIPIO: ', $event);
   // if($event.value == 'nodefinido'){
    //this.llegadaDestinoFormGroup.controls.llegadaDestinoCiudadCtrl.setValue('');
    //}
    //console.log('LLEGADAS DESTINO: ',this.llegadaDestinoFormGroup);

  }

  selectRazonElegirDestino($event:any):void{

    if($event.value === 'Otra'){
      //console.log('$EVENT OTRA: ', $event);
            this.llegadaDestinoFormGroup.addControl('otraRazonElegirDestinoFinalCtrl', new FormControl('', [Validators.required]))

    }else{
      //console.log('ELEGIR RAZON: ', $event);
      this.llegadaDestinoFormGroup.removeControl('otraRazonElegirDestinoFinalCtrl');
    }
  }

// creo boton mati con parametros
  botonMati(): void {
    this.mati.setAttribute('clientid', '5f91a78600ef73001be85cf4');
    this.mati.setAttribute('language', 'es');
    this.mati.setAttribute('metadata', JSON.stringify({user_id: this.id}));
    document.getElementById('mati').appendChild(this.mati);
  }

// Guardo información
  enviarInfo(grupo, paso, stepper: MatStepper, next: boolean, pasoquellama, finalizar: boolean): void {

    let data = {
      paso,
      infoencuesta: grupo.value,
      autorizacion_id: this.autorizacionActual
    };
    //  Guarda por primera vez, no se ha creado la encuesta, id es null
    if (this.id == null && data.paso == 'paso1') {
      this.saving = true;
      this.formService.postForm(data).subscribe(res => {
        this.id = res;
        if (grupo.value.tipoDocumentoCtrl != 'Indocumentado' && this.form === 1) {
         // this.botonMati(); //  Llamo a función para agregar bloque botón mati
        }
        this.snackBar.open('Información almacenada correctamente.', 'X', {
          duration: 2000
        });
        if (next) { // cuando oprimo boton "siguiente"
          this.error = true; // bandera para que no se ejecute stepChange al cambiar de step1 a step2
          stepper.next();
        }
        if (finalizar) {
          this.finalizar();
        }

        //si la respuesta a la pregunta planea estar dentro de colombia es NO
        if(data.infoencuesta['llegadaDestinoPlaneaEstarEnColombiaCtrl'] == 0){
          this.finalizar();
        }

        this.saving = false;
      }, error => {
        if (!next) { // si cambie de step1 a step2 oprimiendo el encabezado llamando a stepChange
          this.snackBar.open('Error al almacenar información. Vuelva a intentarlo. #EPST' + paso, 'X', {
            duration: 2000,
          });
          stepper.previous();
        } else { // si oprimí siguiente
          this.snackBar.open('Error al almacenar información. Vuelva a intentarlo. #EPS' + paso, 'X', {
            duration: 2000
          });
        }
        this.saving = false;
      });
    } else if (this.id == null && data.paso != 'paso1') { // Si intento ir a paso2 pero hubo error en paso1
      this.snackBar.open('Error al almacenar información. Vuelva a intentarlo. #E' + paso, 'X', {
        duration: 2000
      });
      stepper.selectedIndex = 1;
    } else if (this.id != null) {
      if (data.paso == 'paso8') {
        // Determino la cantidad de miembros agregado, sumando 1 que es la persona que responde el formulario
        const cantidadMiembros = this.fourFormGroup.controls.miembrosFamilia.value.length + 1;
        data.infoencuesta.cantidad_miembros = cantidadMiembros;
      }

      this.saving = true;
      this.formService.updateForm(this.id, data).subscribe(res => {
        if (next) { // cuando selecciono botón siguiente
          this.snackBar.open('Información almacenada correctamente', 'X', {
            duration: 2000
          });
          this.error = true; // bandera para que no se ejecute el llamado a stepChange por cambiar de paso
          stepper.next();
        } else { // cuando selecciono el encabezado del siguiente paso directamente y se ejecuta stepChange
          this.snackBar.open('Información almacenada correctamente', 'X', {
            duration: 2000
          });
        }
        if (finalizar) {
          this.finalizar();
        }

        //si la respuesta a la pregunta planea estar dentro de colombia es NO
        if(data.paso == 'paso1'){
          if(data.infoencuesta['llegadaDestinoPlaneaEstarEnColombiaCtrl'] == 0){
            this.finalizar();
          }
        }
        

        this.saving = false;
      }, error => {
        this.error = true; // bandera para llamar solamente a stepChange para el paso en el que estaba inicialmente
        // bloquea el llamado del segundo step al que intento ir pero que me devuelve porq en el paso inicial hubo error
        if (!next) { // cuando cambio de step y llamo a stepChange
          this.snackBar.open('Error al almacenar información. Vuelva a intentarlo. #EEPST' + paso, 'X', {
            duration: 2000,
          });
          stepper.selectedIndex = pasoquellama; // paso en el que estoy antes de llamar al nuevo paso
        } else { // cuando se oprime botón siguiente
          this.error = false; // cuando oprimo siguiente no intenta pasar al siguiente step entonces habilito la  bandera
          // y cuando intente ir a otro paso oprimiendo el step, me permite intentar ir a ese step.
          this.snackBar.open('Error al almacenar información. Vuelva a intentarlo. #EEPS' + paso, 'X', {
            duration: 2000,
          });
        }
        this.saving = false;
      });
    }
  }


  enviarInfoFormulario(grupo):void{
    console.log('GRUPO:: ', grupo);
    let data = {
      infoencuesta: grupo.value,
      autorizacion_id: this.autorizacionActual
    };

    this.saving = true;
  }
}
