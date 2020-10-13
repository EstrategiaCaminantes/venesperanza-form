import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule  } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';




@NgModule({
  declarations: [
    AppComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule, 
    MatFormFieldModule,MatStepperModule, 
    FormsModule, ReactiveFormsModule, MatInputModule,
    MatButtonModule, MatRadioModule,MatGridListModule

  ],
  providers: [],
  bootstrap: [FormComponent]
})
export class AppModule { }
