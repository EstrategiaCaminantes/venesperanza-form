import {Component, OnInit} from '@angular/core';
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
  
  firstFormGroup: FormGroup;
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

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {

    /*this.myGroup = new FormGroup({
      completed: new FormControl()
    });*/
     
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
      

    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      secondNameSecondtCtrl: ['', Validators.required],
      secondLastNameCtrl: ['', Validators.required]
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

/*
  autorizacion(valor){
    if(valor == 1){
      this.isLinear= true;
    }else if(valor==2){
      this.isLinear = false;
    }
  }*/
}
