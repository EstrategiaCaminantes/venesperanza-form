import {Component, OnInit,ViewChild} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';

import { FormService } from '../services/form.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';

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

  otrosmiembros = [
    {
      'primer_nombre':'',
      'segundo_nombre':'',
      'primer_apellido':'',
      'segundo_apellido':'',
      'sexo':'',
      'fecha_nacimiento':''

    }
  ];
  
  //miembrosFamilia = new FormArray([]);
  miembrosFamilia: any;
 
  error = false;

  @ViewChild('stepper') stepper: MatStepper;


  constructor(private _formBuilder: FormBuilder, private formService: FormService, private _snackBar: MatSnackBar) {}

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
     /* miembroFamiliaPrimerNombreCtrl: ['', Validators.required],
      miembroFamiliaSegundoNombreCtrl:[''],
      miembroFamiliaPrimerApellidoCtrl:['',Validators.required],
      miembroFamiliaSegundoApellidoCtrl:[''],
      miembroFamiliaSexoCtrl:['',Validators.required],
      miembroFamiliaFechaNacimientoCtrl:['',Validators.required],*/

      miembrosFamilia: new FormArray([])

     // miembrosFamilia: this._formBuilder.array([], Validators.required)
      /*miembrosFamilia: new FormArray([
        new FormGroup({
          primernombreCtrl: new FormControl(''),
          segundonombreCtrl: new FormControl(''),
          primerapellidoCtrl: new FormControl(''),
              segundoapellidoCtrl: new FormControl('')
        })
        
      ])*/

     

    });
    this.miembrosFamilia = this.fourFormGroup.get("miembrosFamilia") as FormArray;
/*
    const control = new FormGroup({
      primernombreCtrl: new FormControl(''),
      segundonombreCtrl: new FormControl(''),
      primerapellidoCtrl: new FormControl(''),
          segundoapellidoCtrl: new FormControl('')
    });

    
  const checkArray: FormArray = this.fourFormGroup.controls['miembrosFamilia'] as FormArray;
  checkArray.push(control);*/



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
      necesidades22Ctrl: this._formBuilder.array([], Validators.required)
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


setNecedidadesBasicas($event){

  console.log("NECESIDAD: ", $event);

  
  console.log("CONTROLADOR: ", this.sevenFormGroup.controls['necesidades22Ctrl']);
  console.log("CONTROLADOR VALUE: ", this.sevenFormGroup.controls['necesidades22Ctrl'].value);
  const checkArray: FormArray = this.sevenFormGroup.controls['necesidades22Ctrl'] as FormArray;

  if($event.target.checked){
    checkArray.push(new FormControl($event.target.value));

  }else {
    let i: number = 0;
    checkArray.controls.forEach((item: FormControl) => {
      if (item.value == $event.target.value) {
        checkArray.removeAt(i);
        return;
      }
      i++;
    });
  }

  console.log("CONTROLADOR: ", this.sevenFormGroup.controls['necesidades22Ctrl']);
  console.log("ARRAYCHECK", checkArray);

}

agregarNuevoMiembro(){

  console.log("AGREGO GRUPO AL ARRAY DE MIEMBROS FAMILIA:");

  const chekgroup: FormArray = this.fourFormGroup.controls['miembrosFamilia'] as FormArray;

  

  


  //this.miembrosFamilia = this.fourFormGroup.get("miembrosFamilia") as FormArray;

    const controle = new FormGroup({
      primernombreCtrl: new FormControl('',Validators.required),
      segundonombreCtrl: new FormControl(''),
      primerapellidoCtrl: new FormControl('',Validators.required),
          segundoapellidoCtrl: new FormControl(''),
          sexoCtrl: new FormControl('',Validators.required),
          fechaCtrl: new FormControl('',Validators.required)
    });

    chekgroup.push(controle);

    console.log("CHECK",chekgroup);
    console.log("THIS--",this.fourFormGroup);

  
  
}

EliminarMiembro(index){

  
    this.miembrosFamilia.removeAt(index);
    console.log("DESPUES DE ELIMINAR",this.fourFormGroup);
   
}

stepChange(e, stepper){
 console.log(e);
 console.log("ERROR VALOR: ",this.error);
 if(e.previouslySelectedIndex == 0 || e.previouslySelectedIndex == 0 && this.id == null){
   console.log("envio cuando es 0");
  this.enviarInfo(e.previouslySelectedStep.stepControl, 'paso'+(e.previouslySelectedIndex+1), stepper, false, e.previouslySelectedIndex);

 }else if(e.previouslySelectedIndex != 0 ){
   console.log("envio cuando es diferente 0");
  this.enviarInfo(e.previouslySelectedStep.stepControl, 'paso'+(e.previouslySelectedIndex+1), stepper, false, e.previouslySelectedIndex);
    this.error = false;
 }
 this.error = false;
}

enviarInfo(grupo, paso, stepper:MatStepper, next:boolean, pasoquellama){

  console.log("PASO PREVIO: ", pasoquellama);

  console.log("EL PASO ES: ",paso);

      console.log("EL GRUPO ES: ",grupo);
      console.log("EL next ES: ",next);
     


      let data = {
        'paso': paso,
        'infoencuesta': grupo.value,
      }

      //Guarda por primera vez, no se ha creado la encuesta, id es null
      if(this.id == null && data.paso== "paso1"){

        console.log("VALOR DE ID ",this.id);

          this.formService.postForm(data).subscribe(res=>{
            console.log("RESPUESTA: ",res);
            this.id = res['id'];
            

            

            
            console.log("VALRO NEXT",next);
          
            
            if(next){
             /* this._snackBar.open("Información de "+paso+" almacenada correctamente","X",{
                duration:2000
              });*/
              
              
              console.log("PASO ASIGUIENTE?", this.error);
              stepper.next();
            }else{
              this._snackBar.open("Información de "+paso+" almacenada correctamente","X",{
                duration:2000
              });

            }
            

          },error=>{
            //grupo.status = 'INVALID';
            console.log("GRUPO STATUS DESPUES:",grupo.status);
            
            

            console.log(stepper);
            

            if(!next){
              this._snackBar.open("Error al almacenar información en "+paso+". Vuelva a intentarlo",'X',{
                duration:2000,
                
              });

              stepper.previous();

            }else{
              this._snackBar.open("Información de "+paso+" almacenada correctamente","X",{
                duration:2000
              });
            }
      
            
          });
      }else if(this.id == null && data.paso != "paso1"){

        /*
        for (let index = 1; index <= data.paso; index++) {
          const element = this.stepper.steps['_results'][index];
          element.stepControl.status = "INVALID";
          
        }*/
        this._snackBar.open("Verifique que la información en Paso 1 se haya guardado","X",{
           duration:2000
        });
        stepper.selectedIndex= 1;


      }else if(this.id != null){
         //cuando ya el formulario está creado y tengo el id, voy a actualizar
        console.log("VOY A ACTUALIZAR");

        
          if(data.paso == 'paso8'){

            let cantidad_miembros = this.fourFormGroup.controls.miembrosFamilia.value.length+1//miembro principal;
          //console.log(this.fourFormGroup.controls.miembrosFamilia.value.length);

          //console.log("CANTIDAD MIEMBROS FAMILIA: ",cantidad_miembros);

            data['infoencuesta']['cantidad_miembros'] = cantidad_miembros;
            
          }

        
          this.formService.updateForm(this.id,data).subscribe( res=>{

            
            
            
            if(next){
              /*this._snackBar.open("Información de "+paso+" almacenada correctamente","X",{
                duration:2000
              });*/
              
              
              console.log("PASO ASIGUIENTE?");
              stepper.next();
            }else{

              this._snackBar.open("Información de "+paso+" almacenada correctamente","X",{
                duration:2000
              });

            }

            

            //stepper.next();
            //console.log("RESPUESTA: ",res);

            

          },error=>{
              
              //this.error = true;
              if(!next){
                this._snackBar.open("Error al almacenar información en "+paso,'X',{
                  duration:2000,
                  
                });

                console.log("EN EL STEPPER QUE ESTOY: ",stepper);
                console.log("THSI STEPPER: ",this.stepper);
                console.log("THIS ",this.stepper.selectedIndex);
                
                stepper.selectedIndex = pasoquellama;
  
                //stepper.selectedIndex = 0;

              //stepper.previous();

            }else{
              this._snackBar.open("Error al almacenar información en "+paso,'X',{
                duration:2000,
                
              });
            }
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
