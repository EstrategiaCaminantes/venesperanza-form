import {Component, OnInit,ViewChild} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit  {

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

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {

    /*

    this.myGroup = new FormGroup({
      accept: new FormControl()
    });
     
   
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['true', Validators.required]
  
    });
    */
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
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
      thirdCtrl: ['', Validators.required]
    });
    this.fourFormGroup = this._formBuilder.group({
      fourCtrl: ['', Validators.required]
    });
    this.fiveFormGroup = this._formBuilder.group({
      fiverCtrl: ['', Validators.required]
    });
    this.sixFormGroup = this._formBuilder.group({
      sixCtrl: ['', Validators.required]
    });
    this.sevenFormGroup = this._formBuilder.group({
      sevenCtrl: ['', Validators.required]
    });
    this.eightFormGroup = this._formBuilder.group({
      eightCtrl: ['', Validators.required]
    });
    this.nineFormGroup = this._formBuilder.group({
      nineCtrl: ['', Validators.required]
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
  console.log("ENTRO A OTRO",$event.value.name);
  if($event.value.name == 'Otro'){
    console.log("ES OTRO");
    this.otroTipoDocumento = true;
    this.secondFormGroup.addControl('otroTipoDocumentoCtrl',new FormControl('',Validators.required));

  }else if($event.value.name != 'Otro' && this.secondFormGroup.contains('otroTipoDocumentoCtrl')){
    console.log("NO ES OTRO");
    this.otroTipoDocumento = false;
    this.secondFormGroup.removeControl('otroTipoDocumentoCtrl');
  

  }else if($event.value.name == 'Indocumentado'){
    this.secondFormGroup.removeControl('numeroDocumentoCtrl');
    this.numeroDocumento = false;

  }else if($event.value.name != 'Indocumentado' && !this.secondFormGroup.contains('numeroDocumentoCtrl') ){
    this.secondFormGroup.addControl('numeroDocumentoCtrl',new FormControl('',Validators.required));
    this.numeroDocumento = true;

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
