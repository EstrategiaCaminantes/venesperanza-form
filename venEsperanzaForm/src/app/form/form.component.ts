import {Component, OnInit,ViewChild} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';

import { FormService } from '../services/form.service';

@Component({
  selector: 'app-root',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit  {

  id = null;

  title = 'venEsperanzaForm';

  isLinear = true;

  //myGroup: FormGroup;

  termnsandconditions = true;
  titleheader = true;
  quentionaccepttermns = true;
  thanksmessage = false;
  buttonsConfirm = true;

  otroTipoDocumento = false;

  formPrincipal = false;
  numeroDocumento = true;

  contactoAlternativoInput = false;
  lineacontactoWhatsappInput = false;
  
  //firstFormGroup: FormGroup;
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

  nacionalidades=[
    {name:'Colombiana'},
    {name: 'Venezolana'},
    {name: 'Otro'}
  ];

  tipoDocumentos=[
    {name:'Acta de Nacimiento'},
    {name:'Cédula de Identidad (venezonala)'},
    {name: 'Cédula de ciudadania (colombiana)'},
    {name:'Indocumentado'},
    {name: 'Otro'}
  ];

  /*
  departamentosList = [
    {id:'1',name:'Antioquia'},
    {id:'2',name:'Bogota'},
    {id:'3',name:'Santander'}

  ];

  municipiosList = [
    {id:'1',id_departamento:'1',name:'Medellin'},
    {id:'2',id_departamento:'1',name:'Envidado'},
    {id:'3',id_departamento:'2',name:'Bogota'},
    {id:'4',id_departamento:'3',name:'Bucaramanga'},
    {id:'5',id_departamento:'3',name:'Floridablanca'}
  ]*/

  departamentosList = [];

  municipiosList = [];

  municipiosFilter = [];
  necesidadesList = [];
  /*necesidadesList = [
    {
      name: "Alojamiento",
      value: "alojamiento"
    },
    {
      name: "Comida",
      value: "comida"
      
    },
    {
      name: "Empleo",
      value: "empleo"
    },
    {
      name: "Salud",
      value: "salud"
    },
    {
      name: "Educación",
      value: "educacion"
    },
    {
      name: "Agua",
      value: "agua"
    },
    {
      name: "Conectividad",
      value: "conectividad"
    }];
*/
  constructor(private _formBuilder: FormBuilder, private formService: FormService) {}

  ngOnInit() {

    this.formService.getDepartamentos()
    .subscribe((data: any[]) => {
      this.departamentosList = data;
      console.log("DEPARTAMENTOS: ",data);
    });

    this.formService.getMunicipios()
    .subscribe((data: any[]) => {
      this.municipiosList = data;
      this.municipiosFilter = this.municipiosList
      console.log("MUNICIPIOS: ",data);
    });

    this.formService.getNecesidadesBasicas()
    .subscribe((data: any[]) => {
      this.necesidadesList = data;
      
    })

    /*

    this.myGroup = new FormGroup({
      accept: new FormControl()
    });
     
   
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['true', Validators.required]
  
    });
    */
    this.secondFormGroup = this._formBuilder.group({
      
      firstNameCtrl: ['', Validators.required],
      secondNameCtrl: [''],
      lastNameCtrl: ['', Validators.required],
      secondLastNameCtrl: [''],
      sexoCtrl:[''],
      fechaNacimientoCtrl:[''],
      nacionalidadCtrl:['',Validators.required],
      tipoDocumentoCtrl:['',Validators.required],
      numeroDocumentoCtrl:['',Validators.required]
    });



    this.thirdFormGroup = this._formBuilder.group({
      departamentoCtrl: ['', Validators.required],
      municipioCtrl: ['', Validators.required],
      barrioCtrl:['',Validators.required],
      direccionCtrl:[''],
      numeroContactoCtrl:['',Validators.required],
      lineaContactoPropiaCtrl:['',Validators.required],
      correoCtrl:[''],
      comentarioAdicionalCtrl:['']
    });


    this.fourFormGroup = this._formBuilder.group({
      miembroFamiliaPrimerNombreCtrl: ['', Validators.required],
      miembroFamiliaSegundoNombreCtrl:[''],
      miembroFamiliaPrimerApellidoCtrl:['',Validators.required],
      miembroFamiliaSegundoApellidoCtrl:[''],
      miembroFamiliaSexoCtrl:['',Validators.required],
      miembroFamiliaFechaNacimientoCtrl:['',Validators.required]

    });


    this.fiveFormGroup = this._formBuilder.group({
      mujeresEmbarazadasCtrl: [''],
      mujeresLactantesCtrl:[''],
      personasDiscapacidadCtrl: [''],
      personasEnfermedadesCronicasCtrl:['']
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
      necesidades22Ctrl: ['', Validators.required]
    });



    this.eightFormGroup = this._formBuilder.group({
      alojamientoViviendaCtrl: [''],
    });

    this.nineFormGroup = this._formBuilder.group({
      economicoCtrl: [''],
      gastoHogar7diasCtrl:[''] 

    });
    
    this.tenFormGroup = this._formBuilder.group({
      tenCtrl: ['', Validators.required]
    });

    /*
    if(this.autorizacionSeleccionada == 1){
      this.isLinear = true;
    }else{
      this.isLinear = false;
    }*/
    

    

  }


termsAccept($event: any) {
  console.log($event);
  
  this.termnsandconditions = false;
  this.quentionaccepttermns = false;
  this.buttonsConfirm = false;

  if($event == false){
    this.titleheader = false;
    this.formPrincipal = false;
    this.thanksmessage = true;

  }else if($event == true){
    this.formPrincipal = true;
    
  }
}

selectTipoDocumento($event: any){
  console.log("ENTRO A OTRO",$event.value);
  if($event.value == 'Otro'){
    console.log("ES OTRO");
    this.otroTipoDocumento = true;
    this.secondFormGroup.addControl('otroTipoDocumentoCtrl',new FormControl('',Validators.required));

  }else if($event.value != 'Otro' && this.secondFormGroup.contains('otroTipoDocumentoCtrl')){
    console.log("NO ES OTRO");
    this.otroTipoDocumento = false;
    this.secondFormGroup.removeControl('otroTipoDocumentoCtrl');
  

  }
  if($event.value == 'Indocumentado'){
    this.secondFormGroup.removeControl('numeroDocumentoCtrl');
    this.numeroDocumento = false;

  }else if($event.value != 'Indocumentado' && !this.secondFormGroup.contains('numeroDocumentoCtrl') ){
    this.secondFormGroup.addControl('numeroDocumentoCtrl',new FormControl('',Validators.required));
    this.numeroDocumento = true;

  }
  
}


selectDepartamento($event:any){

  console.log("DEPARTAMENTO : ", $event)

  this.municipiosFilter = this.municipiosList;

  const municipiosnuevo = this.municipiosList.filter(muni => muni.id_departamento == $event.value);


  this.municipiosFilter = municipiosnuevo;

  console.log("MUNICIPIOS: ",this.municipiosFilter);
  this.thirdFormGroup.controls['municipioCtrl'].setValue(null); 
  console.log("MUNICIPIO ACTUAL: ", this.thirdFormGroup.controls['municipioCtrl']);


  
}

selectMunicipio($event: any){
  console.log("MUNICIPIO SELECCIONADO: ", $event);
}

lineaContactoPropia($event: any){
  console.log("LINEA EVENTO: ", $event);
  console.log("LINEA EVENTO: ", $event.value);
  console.log("LINEA EVENTO: ", $event.value.toString());

  console.log("LINEA DE CONTACTO: ", this.thirdFormGroup.controls['lineaContactoPropiaCtrl'].value );
  console.log("LINEA EVENTO: ", this.thirdFormGroup.controls['lineaContactoPropiaCtrl']);
  if($event.value === "si"){

    this.contactoAlternativoInput = false;
    this.lineacontactoWhatsappInput = true;

    
    this.thirdFormGroup.addControl('lineaContactoAsociadaAWhatsappCtrl',new FormControl('',Validators.required));

    if(this.thirdFormGroup.contains('contactoAlternativoCtrl')){
      this.thirdFormGroup.removeControl('contactoAlternativoCtrl');
    }
    

  }else if($event.value === "no"){

    this.contactoAlternativoInput = true;
    this.lineacontactoWhatsappInput = false;
    this.thirdFormGroup.addControl('contactoAlternativoCtrl',new FormControl('',Validators.required));
    

    if(this.thirdFormGroup.contains('contactoAlternativoCtrl')){
      this.thirdFormGroup.removeControl('lineaContactoAsociadaAWhatsappCtrl');
    }

   

  }
  
}


setNecedidadesBasicas(necesidad:any){

  console.log("NECESIDAD: ", necesidad);
  console.log("CONTROLADOR: ", this.sevenFormGroup.controls['necesidades22Ctrl']);
  console.log("CONTROLADOR VALUE: ", this.sevenFormGroup.controls['necesidades22Ctrl'].value);

}

enviarInfo(grupo,paso){
  console.log("EL PASO ES: ",paso);

      console.log("EL GRUPO ES: ",grupo);


      let data = {
        'paso': paso,
        'infoencuesta': grupo.value,
      }

      if(this.id == null){

          this.formService.postForm(data).subscribe(res=>{
            console.log("RESPUESTA: ",res);
            this.id = res['id'];

          });
      }else{
        console.log("VOY A ACTUALIZAR");
        

        this.formService.updateForm(this.id,data).subscribe( res=>{
          console.log("RESPUESTA: ",res);
          this.id = res['id'];

        });
        
      }
          

    
 

}
/*
  autorizacion(valor){
    if(valor == 1){
      this.isLinear= true;
    }else if(valor==2){
      this.isLinear = false;
    }
  }*/
}
